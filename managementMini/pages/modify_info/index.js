import { request,URL } from "../../request/index.js"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo:[],
    id:null,
    username:'',
    nickname:'',
    email:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:wx.getStorageSync('id')
    })
    this.getUserInfo()
  },
  //获取用户信息
  getUserInfo(){
    const id = this.data.id;
    if(id !== null){
      request({url:"/my/userinfo",
      data:{
        id
      },
      header:{"Content-Type": "application/x-www-form-urlencoded"},
      method:"post"
      })
      .then(result=>{
        const imgPath = result.data.data.user_pic
        if (imgPath.indexOf('http') === -1) {
          result.data.data.user_pic = URL + imgPath
        }
        this.setData({
          userInfo:result.data.data,
          username:result.data.data.username,
          nickname:result.data.data.nickname,
          email:result.data.data.email,
        })
        wx.setStorageSync('nickname',result.data.data.nickname)
      })
    }
  },
  //更换头像跳转路由
  userPic:function(){
    const id = this.data.id
    wx.navigateTo({
      url: '../updata_avatar/index?cid=' + id,
    })
  },
  //接收账户名
  username:function(e){
    // console.log(e.detail.value);
    this.setData({
      username:e.detail.value
    })
  },
  //接收昵称
  nickname:function(e){
    this.setData({
      nickname:e.detail.value
    })
  },
  //接收邮箱
  email:function(e){
    this.setData({
      email:e.detail.value
    })
  },
  //提交修改用户信息
  modifyInfo:function(){
    const username = this.data.username
    const nickname = this.data.nickname
    const email = this.data.email
    const id = this.data.id
    if (username === '' || nickname === '' || email === '') {
      wx.showModal({
        title:'用户信息不能为空！',
        showCancel:false,
      })
      return
    }
    request({url:"/my/userinfo_id",
    data:{
      username,
      nickname,
      email,
      id
    },
    header:{"Content-Type": "application/x-www-form-urlencoded"},
    method:"post"
    })
    .then(result=>{
      if(result.data.status === 0){
        wx.showModal({
          title:'修改信息成功！',
          showCancel:false,
          success:()=>{
            this.getUserInfo()
            request({url:'/my/userinfo',
            data:{
              id
            },
            header:{"Content-Type": "application/x-www-form-urlencoded"},
            method:"post"
            }).then(result=>{
              const nickName = result.data.data.nickname
              const user_pic = result.data.data.user_pic
              request({url:'/my/releaseProposal/uploadUserinfo',
              data:{
                nickName,
                user_pic,
                user_id:id
              },
              header:{"Content-Type": "application/x-www-form-urlencoded"},
              method:"post"
              }).then(res=>{})
            })
            wx.reLaunch({
              url:'../user/index'
            })
          }
        })
      }else if(result.data.status === 1){
        wx.showModal({
          title:result.data.message,
          showCancel:false,
        })
      }
      else{
        wx.showModal({
          title:'信息重复/不符合规则！',
          showCancel:false,
        })
      }
    })
    
  },
  onShow:function(){
    this.onLoad()
  }
})
