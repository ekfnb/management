import { request,URL } from "../../request/index.js"
Page({
  data: {
    //项目内容
    detailsList:[],
    //项目发布时间
    dates:[],
    //项目详情文章内容
    detailsText:[],
  },
  onLoad: function (options) {
    const id = options.cid
    this.getdetailsList(id)
  },
  //获取详情的函数
  getdetailsList(id){
    request({url:"/my/projectFailed/getProjectFailedId",
    data:{id},
    header:{"Content-Type": "application/x-www-form-urlencoded"},
    method:"post"
    })
    .then(result=>{
      
      const dynamicList = result.data.data
      const dateRrr = []
      for(var k in dynamicList){
        var date = new Date(dynamicList[k].dates).toJSON()
        var createTime = new Date(+new Date(date) + 8 *3600 *1000).toISOString().replace(/T/g,'--').replace(/\.[\d]{3}Z/,'')
        dateRrr.push(createTime)
        dynamicList[k].user_pic = URL + dynamicList[k].user_pic
        dynamicList[k].articleContent= dynamicList[k].articleContent.replace(/\<img/gi, '< img style="max-width:100%;height:auto"')
      }
      this.setData({
        detailsList:dynamicList
      })
      this.setData({
        dates:dateRrr
      })
    })
  },
})