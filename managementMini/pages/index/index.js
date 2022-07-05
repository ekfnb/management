//引用发送请求的方法
import { request,URL } from "../../request/index.js"
Page({
  data: { 
    //导航轮播图 
    swiperList:[],
    //获取成功项目
    SuccessProject:[],
  },
  //页面加载
  onLoad: function(options) {
    this.whetherLogin()
    this.getSwiperList()
    this.getSuccessProject()
  },
  //判断是否登录
  whetherLogin(){
    // console.log(wx.getStorageInfoSync('token').keys);
    const lookupToken = wx.getStorageInfoSync('token').keys
    if(lookupToken[0] === 'token' || lookupToken[1] === 'token' || lookupToken[2] === 'token' || lookupToken[3] === 'token'){
    }else{
      wx.redirectTo({
        url: '../login/index',
      })
    }
  },
  //获取轮播图数据
  getSwiperList(){
    request({url:"/my/picture"})
    .then(result=>{
      if (result.data.message === '身份验证失败') {
        wx.redirectTo({
          url: '../login/index',
        })
        return
      }
      const res = result.data.data
      for (var i in res) {
        if(res[i].user_pic === null){
          res[i].splice(i,1)
        }else{
          res[i].user_pic = URL + res[i].user_pic
        }
      }
      this.setData({
      swiperList:res
      })
    })
  },
  //获取成功项目的函数
  getSuccessProject(){
    request({url:'/my/projectSuccess/getProjectSuccess'}).then(result=>{
      const Success = result.data.data
      for(var k in Success){
        var date = new Date(Success[k].dates).toJSON()
        var createTime = new Date(+new Date(date) + 8 *3600 *1000)
        .toISOString().replace(/T/g,'--')
        .replace(/\.[\d]{3}Z/,'')
        Success[k].dates = createTime
        Success[k].user_pic = URL+Success[k].user_pic
      }
      this.setData({
        SuccessProject:Success
      })
    })
    //关闭下拉刷新的窗口
    wx.stopPullDownRefresh();
  },
  //下拉刷新功能
  onPullDownRefresh(){
    wx.showLoading({
      title: '加载中...',
      mask:true
    });
    this.setData({
      //重置数组
      swiperList:[],
      //重新获取成功项目
      SuccessProject:[]
    });
    //重新判断是否登录
    this.whetherLogin()
    //重新获取轮播图数据
    this.getSwiperList()
    //重新获取成功项目
    this.getSuccessProject()
    wx.hideLoading({
      noConflict:false,
      success:function(){},
      fail:function(){},
      complete:function(){}
    })
  }
});
  