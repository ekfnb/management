import { request,URL } from "../../request/index.js"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //页面内容数据
    dynamicList:[],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getdynamic()
    this.whetherLogin()
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
  //获取页面数据函数
  getdynamic(){
    request({url:"/my/artCateRouter/cates",})
    .then(result=>{
      if (result.data.message === '身份验证失败') {
        wx.redirectTo({
          url: '../login/index',
        })
        return
      }
      const dyList = result.data.data
      for(var k in dyList){
        var date = new Date(dyList[k].dates).toJSON()
        var createTime = new Date(+new Date(date) + 8 *3600 *1000)
        .toISOString().replace(/T/g,'--')
        .replace(/\.[\d]{3}Z/,'')
        dyList[k].dates = createTime
        dyList[k].user_pic = URL + dyList[k].user_pic
      }
      this.setData({
        dynamicList:dyList
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
      //重置列表数组
      dynamicList:[],
    });
    //重新判断是否登录
    this.whetherLogin()
    //获取页面数据函数
    this.getdynamic()
    wx.hideLoading({
      noConflict:false,
      success:function(){},
      fail:function(){},
      complete:function(){}
    })
    
  }
})