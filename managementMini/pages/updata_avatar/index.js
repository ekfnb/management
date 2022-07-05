import { request,URL } from "../../request/index.js"
Page({
  data: {
    userInfo:[],
    avatar:'',
    id:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const imgPath = options.src
    this.uploadheadservice(imgPath)
    this.setData({
      id:wx.getStorageSync('id')
    })
    this.getUserInfo(this.data.id)
  },
  //获取用户头像
  getUserInfo(id){
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
        if (result.data.status === 0) {
          wx.setStorageSync('nickname', result.data.data.nickname)
          wx.setStorageSync('user_pic', result.data.data.user_pic)
        }
        this.setData({
          userInfo:result.data.data
        })
      })
  },
  //更换头像处理函数
  uploadTap:function(){
    wx.chooseImage({
      count:1,
      success: (res) => {
        const imgPath = res.tempFilePaths
        wx.navigateTo({
          url: '../avatar/index?src=' + imgPath[0],
        })
      },
    })
  },
  //头像上传处理函数
  uploadheadservice(imgPath){
    const _this = this
    wx.uploadFile({
      filePath: imgPath,
      name: 'files',
      header:{"Authorization" : wx.getStorageSync('token')},
      url: URL + '/my/image/add_file',
      success(results){
        const res = JSON.parse(results.data)
        const avatar = res.response.filepath
        request({
          url:'/my/update/avater',
          data:{avatar},
          header:{"Content-Type": "application/x-www-form-urlencoded"},
          method:"post"
        }).then(results=>{
          const id = _this.data.id
          const status = results.data.status
          if (status === 0) {
            wx.showLoading({
              title: '更换头像成功！',
              icon: 'success',
              mask:true,
              success:function(){
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
                wx.navigateBack({
                  delta: 1,
                })
              }
            })
            wx.hideLoading({
              noConflict:false,
              success:function(){},
              fail:function(){},
              complete:function(){}
            })
          }else{
            wx.showModal({
              title: '更换头像失败！',
              showCancel:false
            })
          }
        })
      }
    })
  },
  onShow:function(){
    this.getUserInfo(this.data.id)
  }
})