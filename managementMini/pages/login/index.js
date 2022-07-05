import { request } from "../../request/index.js"
Page({
  data: {
    userName:null,
    userPwd:null,
  },
  onLoad() {
    // this.getUserList();
  },
  //获取用户输入的用户名
  username:function(e)
  {
    this.setData({
      userName: e.detail.value
    })
  },
  //获取用户输入的密码
  password:function(e)
  {
    this.setData({
      userPwd: e.detail.value
    })
  },
  //登录触发函数
  loginBut:function(){
    const userName = this.data.userName
    const pwd = this.data.userPwd
    if (userName === null || pwd === null) {
      wx.showModal({
        title:'账号和密码不能为空！',
        showCancel:false,
      })
      return
    }
    //向后端发送请求方法
    request({url:"/api/login",
    data:{
      username:userName,
      password:pwd,
    },
    header:{"Content-Type": "application/x-www-form-urlencoded"},
    method:"post"})
    .then(result=>{
      const statu = result.data.status
      if(statu === 0){
        const token = result.data.token 
        // const nickname = result.data.nickname
        wx.setStorageSync('token', token)
        //wx.setStorageSync('nickname', nickname)
        const id = result.data.id
        wx.setStorageSync('id',id)
        wx.showLoading({
          title: '登录成功！',
          icon: 'loading',
          success:function(){
            setTimeout(function(){
              wx.switchTab({
                url: '../../pages/user/index'
              })
            },1500)
          }
        })
      }
      else{
        wx.showModal({
          title:'账号或密码错误！',
          showCancel:false,
        })
      }
      
    })
  },
  //注销登录功能
  logoutBut:function(e){
    const getToken = wx.getStorageSync('token')
    if(getToken){
      wx.showModal({
        title: '',
        content: '是否注销登录？',
        success(res) {
          if (res.confirm) {
            wx.showToast({
              title: '已退出登录！',
              icon: 'loading',
            })
            wx.removeStorageSync('token')
            wx.removeStorageSync('id')
          }
        }
      })
    }else{
      wx.showModal({
        title:'账号未登录！',
        showCancel:false,
      })
    }
  },
  //跳转注册页
  register:function(e){
    wx.navigateTo({
       url: '../register/index',
    })
  },
  onShow(){
    //取消左上角返回首页按钮回调函数
    wx.hideHomeButton()
  }
})