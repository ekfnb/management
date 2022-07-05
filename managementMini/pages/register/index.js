import { request } from "../../request/index.js"
Page({
  data: {
    userName:null,
    userPwd:null,
    actname:null,
    confirmpassword:null,
    userEmail:null
  },
  onLoad: function (options) {

  },
  //获取用户输入用户名
  accountName:function(e)
  {
    this.setData({
      actname: e.detail.value
    })
  },
  //获取用户输入账号
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
  //获取用户输入的确认密码
  confirmPwd:function(e)
  {
    this.setData({
      confirmpassword: e.detail.value
    })
  },
  email:function(e)
  {
    this.setData({
      userEmail: e.detail.value
    })
  },
  //注册处理函数
  regiserBut:function(e){
    wx.getUserProfile({
      desc:"请授权微信",
      success:res =>{
        const user_pic = res.userInfo.avatarUrl
        const userName = this.data.userName
        const userPwd = this.data.userPwd
        const actname = this.data.actname
        const confirmpassword = this.data.confirmpassword
        const userEmail = this.data.userEmail
        if(userName === null||userPwd === null || actname === null || confirmpassword === null || userEmail === null){
          wx.showModal({
            title:'输入信息不能为空',
            showCancel:false,
          })
        }
        else{
          if(userPwd === confirmpassword){
            request({url:"/api/regser",
            data:{
              username:userName,
              password:userPwd,
              nickname:actname,
              email:userEmail,
              user_pic
            },
            header:{"Content-Type": "application/x-www-form-urlencoded"},
            method:"post"})
            .then(result=>{
              if(result.data.status === 0){
                wx.showModal({
                  title:'注册成功',
                  showCancel:false,
                })
                wx.navigateTo({
                  url: '../login/index',
              })
              }else{
                wx.showModal({
                  title:result.data.message,
                  showCancel:false,
                })
              }
            })
          }
          else{
            wx.showModal({
              title:'两次密码输入不一致',
              showCancel:false,
            })
          }
        }
      }
    })
    
  },
  onShow: function () {
    //取消左上角返回首页按钮回调函数
    wx.hideHomeButton()
  },
})