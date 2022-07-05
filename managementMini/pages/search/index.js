import { request,URL } from "../../request/index.js"
Page({
  data: {
    //搜索数据
    handlerQueryData:[],
    //获取搜索框内容
    inputValue:null,
  },
  onLoad: function (options) {
  },
  getInput:function(e)
  {
    this.setData({
      inputValue: e.detail.value
    })
  },
  //搜索功能处理方法
  querys:function(e){
    const name = this.data.inputValue
    request({url:'/my/query/fuzzy_query',
    data:{name},
    header:{"Content-Type": "application/x-www-form-urlencoded"},
    method:"post"}).then(res=>{
      const getDataArr = res.data.data
      //将二维数组转换为一维数组
      const trimData = getDataArr.reduce(function(a,b){return a.concat(b)})
      for(var k in trimData){
        var date = new Date(trimData[k].dates).toJSON()
        var createTime = new Date(+new Date(date) + 8 * 3600 * 1000)
          .toISOString().replace(/T/g, '--').replace(/\.[\d]{3}Z/, '')
        trimData[k].dates = createTime
        if (trimData[k].user_pic === null) {
          trimData[k].user_pic = '../../icom/no_img.png'
        }else{
          trimData[k].user_pic = URL + trimData[k].user_pic
        }
      }
      for(var i in trimData){
        if (trimData[i].is_step === 5) {
          trimData[i].province="项目发布"
        }
        if (trimData[i].is_step === 6) {
          trimData[i].province="待审核项目"
        }
        if (trimData[i].is_step === 7) {
          trimData[i].province="审核成功项目"
        }
        if (trimData[i].is_step === 8) {
          trimData[i].province="审核失败项目"
        }
      }
      this.setData({
        handlerQueryData:trimData
      })
    })
  },
  //列表点击跳转页面路由处理函数
  handlerURL:function(e){
    const is_step = e.currentTarget.dataset.is_step
    const id = e.currentTarget.dataset.id
    if (is_step === 5) {
      wx.navigateTo({
        url:'../../pages/project_details/index?cid=' + id
      })
      return
    }
    if (is_step === 6) {
      wx.navigateTo({
        url:'../../pages/election_details/index?cid=' + id
      })
      return
    }
    if (is_step === 7) {
      wx.navigateTo({
        url:'../../pages/release_details/index?cid=' + id
      })
      return
    }
    if (is_step === 8) {
      wx.navigateTo({
        url:'../../pages/fail_details/index?cid=' + id
      })
      return
    }
  }
})