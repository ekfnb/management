import { request,URL } from "../../request/index.js"
Page({
  data: {
    //个人信息数据
    userInfo:[],
    //获取账户id
    id:null
  },
  onLoad(options) {
    this.whetherLogin()
    this.getUserInfo()
  },
   //判断是否登录
   whetherLogin(){
    const lookupToken = wx.getStorageInfoSync('token').keys
    if(lookupToken[0] === 'token' || lookupToken[1] === 'token'|| lookupToken[2] === 'token'|| lookupToken[3] === 'token'){
      this.setData({
        id:wx.getStorageSync('id')
      })
    }else{
      wx.redirectTo({
        url: '../login/index',
      })
    }
  },
  //获取用户信息
  getUserInfo(){
    const id = this.data.id
    if(id !== null){
      request({url:"/my/userinfo",
      data:{
        id
      },
      header:{"Content-Type": "application/x-www-form-urlencoded"},
      method:"post"
      })
      .then(result=>{
        if (result.data.message === '身份验证失败') {
          wx.redirectTo({
            url: '../login/index',
          })
          return
        }
        const imgPath = result.data.data.user_pic
        if (imgPath.indexOf('http') === -1) {
          result.data.data.user_pic = URL + imgPath
        }
        if (result.data.status === 0) {
          wx.setStorageSync('nickname', result.data.data.nickname)
          wx.setStorageSync('user_pic', result.data.data.user_pic)
        }
        this.setData({
          userInfo:result.data.data
        })
      })
    }
    //关闭下拉刷新的窗口
    wx.stopPullDownRefresh();
  },
  //切换账号登录
  switchAccountBut:function(){
    wx.showModal({
      title: '信息提示：',
      content: '是否切换账号？',
      success(res) {
        if (res.confirm) {
          wx.removeStorageSync('token')
          wx.removeStorageSync('id')
          wx.removeStorageSync('nickname')
          wx.removeStorageSync('user_pic')
          wx.redirectTo({
            url: '../login/index',
          })
        }
      }
    })
  },
  //跳转修改信息页面
  modifyInfo:function(){
    wx.navigateTo({
      url: '../modify_info/index',
    })
  },
  //下拉刷新功能
  onPullDownRefresh(){
    wx.showLoading({
      title: '加载中...',
      mask:true
    });
    
    this.setData({
      //重置数组
      userInfo:[]
    });
    //重新判断是否登录
    this.whetherLogin()
    //重新发送请求
    this.getUserInfo();
    wx.hideLoading({
      noConflict:false,
      success:function(){},
      fail:function(){},
      complete:function(){}
    })
  },
  onShow:function(){
    this.onLoad()
  }
})
