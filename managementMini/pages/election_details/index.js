import { request,URL } from "../../request/index.js"
Page({
  data: {
    //项目内容
    detailsList:[],
    //项目发布内容
    detailsText:[],
    //项目发布时间
    dates:[],
    check:true,
    //投票结果数据
    vote_result:[],
    //投票结果加一
    add_fail:'',
    add_release:''
  },
  onLoad: function (options) {
    const id = options.cid
    this.getdetailsList(id)
  },
  //获取详情的函数
  getdetailsList(id){
    request({url:"/my/projectVote/get_projectVote_id",
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
      this.getVoteResults()
    })
  },
  //不赞成点击按钮
  failBut:function(){
    this.releaseFailfunction(0,1)
    this.setData({
      check:false
    })
  },
  //赞成点击按钮
  releaseBut:function(){
    this.releaseFailfunction(1,0)
    this.setData({
      check:false
    })
  },
  //获取投票数传给后台的处理方法
  releaseFailfunction(success,failed){
    if(this.data.check){
      const vote_project = this.data.detailsList[0].name
      request({url:'/my/voteResult/addvoteResult',
      data:{
        vote_project,
        success,
        failed
      },
      header:{"Content-Type": "application/x-www-form-urlencoded"},
      method:"post"
      })
      .then(result=>{
        wx.showToast({
          title: '投票成功！',
          icon: 'loading',
        })
      })
      if(failed === 1){
        this.setData({
          add_fail:'+1'
        })
      }
      if(success === 1){
        this.setData({
          add_release:'+1'
        })
      }
      this.getVoteResults()
    }
  },
  //获取点赞结果
  getVoteResults(){
    const vote_project = this.data.detailsList[0].name
    request({url:'/my/voteResult/getvoteResult_id',
    data:{
      vote_project
    },
    header:{"Content-Type": "application/x-www-form-urlencoded"},
    method:"post"
    }).then(result=>{
      this.setData({
        vote_result:result.data.data
      })
    }) 
  }
})