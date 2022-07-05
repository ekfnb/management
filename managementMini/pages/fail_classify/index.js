import { request,URL } from "../../request/index.js"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //页面内容数据
    dynamicList:[],
    //项目标题
    region:[],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const region = decodeURIComponent(options.region)
    this.setData({
      region
    })
    this.getdynamic()
  },
  //获取页面数据函数
  getdynamic(){
    request({url:"/my/projectFailed/getProjectFailed"})
    .then(result=>{
      const dynamicList = result.data.data
      let isRegionArr = []
      for(var k in dynamicList){
        var date = new Date(dynamicList[k].dates).toJSON()
        var createTime = new Date(+new Date(date) + 8 *3600 *1000).toISOString().replace(/T/g,'--').replace(/\.[\d]{3}Z/,'')
        dynamicList[k].dates = createTime
        dynamicList[k].user_pic = URL + dynamicList[k].user_pic
        if(dynamicList[k].region === this.data.region){
          isRegionArr.push(dynamicList[k])
        }
      }
      this.setData({
        dynamicList:isRegionArr
      })
    })
  },
})