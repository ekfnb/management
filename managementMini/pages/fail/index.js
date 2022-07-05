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
  },
  //获取页面数据函数
  getdynamic(){
    request({url:"/my/projectFailed/getProjectFailed"})
    .then(result=>{
      const dynamicList = result.data.data
      for(var k in dynamicList){
        var date = new Date(dynamicList[k].dates).toJSON()
        var createTime = new Date(+new Date(date) + 8 *3600 *1000).toISOString().replace(/T/g,'--').replace(/\.[\d]{3}Z/,'')
        dynamicList[k].dates = createTime
        dynamicList[k].user_pic = URL + dynamicList[k].user_pic
      }
      this.setData({
        dynamicList:dynamicList
      })
    })
    //关闭下拉刷新的窗口
    wx.stopPullDownRefresh()
  },
  //刷新页面数据函数
  onPullDownRefresh(){
    this.setData({
      dynamicList:[]
    })
    //从新执行获取数据函数
    this.getdynamic()
  }
})