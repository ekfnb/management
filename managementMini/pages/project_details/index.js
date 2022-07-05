import { request,URL } from "../../request/index.js"
Page({
  data: {
    //项目内容
    detailsList:[],
    //发表建议内容
    concent:[],
    //表单接收发布建议内容
    recomText:[],
    //所有用户建议信息
    proposalInfo:[],
    //个人用户建议信息
    personalAdvice:[]
  },
  onLoad: function (options) {
    const id = options.cid
    this.getdetailsList(id)
    this.getProposalInfo(id)
    this.getUserProposalList(id)
  },
   //获取详情的函数
   getdetailsList(id){
    request({url:"/my/artCateRouter/cates_id",
    data:{id},
    header:{"Content-Type": "application/x-www-form-urlencoded"},
    method:"post"
    })
    .then(result=>{
      var dynamicList = result.data.data
      for(var k in dynamicList){
        var date = new Date(dynamicList[k].dates).toJSON()
        var createTime = new Date(+new Date(date) + 8 *3600 *1000).toISOString().replace(/T/g,'--').replace(/\.[\d]{3}Z/,'')
        dynamicList[k].dates = createTime
        dynamicList[k].user_pic = URL + dynamicList[k].user_pic
        dynamicList[k].articleContent= dynamicList[k].articleContent.replace(/\<img/gi, '< img style="max-width:100%;height:auto"')
      } 
      this.setData({
        detailsList:dynamicList
      })
    })
  },
  //接收建议文本框内容
  bindRecomText:function(e){
    this.setData({
      concent:e.detail.value
    })  
  },
  //发布建议
  fabiao:function(e){
    this.setData({
      recomText:this.data.concent
    })
    const _this = this
    const user_id = wx.getStorageSync('id')
    const proposal =  this.data.recomText
    const nickName = wx.getStorageSync('nickname')
    const user_pic = wx.getStorageSync('user_pic')
    const project_id = this.data.detailsList[0].id
    request({url:'/my/releaseProposal/addReleaseProposal',
    data:{
      nickName,
      proposal,
      project_id,
      user_pic,
      user_id
    },
    header:{"Content-Type": "application/x-www-form-urlencoded"},
    method:"post"}).then(result=>{
      if(result.data.status === 0){
        wx.showLoading({
          title: '发布成功！',
          icon: 'loading',
          duration:1000,
          success:function(){
            setTimeout(function(){
              _this.getProposalInfo(project_id)
              _this.getUserProposalList(project_id)
            },1000)
          }
        })
      }else{
        wx.showLoading({
          title:'发布失败！',
          showCancel:false,
          success:function(){
            setTimeout(function(){
            },1500)
          }
        })
      }
    })
  },
  //获取个人用户建议数据
  getUserProposalList(project_id){
    const user_id = wx.getStorageSync('id')
    request({url:'/my/releaseProposal/getPersonalAdvice',
    data:{
      project_id,
      user_id
    },
    header:{"Content-Type": "application/x-www-form-urlencoded"},
    method:"post"
    })
    .then(result=>{
      const proposalList = result.data.data
      for(var k in proposalList){
        var date = new Date(proposalList[k].dates).toJSON()
        var createTime = new Date(+new Date(date) + 8 *3600 *1000).toISOString().replace(/T/g,'--').replace(/\.[\d]{3}Z/,'')
        proposalList[k].dates = createTime
        if (proposalList[k].user_pic.indexOf('http') === -1) {
          proposalList[k].user_pic = URL + proposalList[k].user_pic
        }
      }
      this.setData({
        personalAdvice:proposalList
      })
    })
  },
  //获取所有用户发表建议的信息
  getProposalInfo(project_id){
    request({url:'/my/releaseProposal/getReleaseProposal',
    data:{
      project_id
    },
    header:{"Content-Type": "application/x-www-form-urlencoded"},
    method:"post"
    })
    .then(result=>{
      const proposalList = result.data.data
      for(var k in proposalList){
        var date = new Date(proposalList[k].dates).toJSON()
        var createTime = new Date(+new Date(date) + 8 *3600 *1000).toISOString().replace(/T/g,'--').replace(/\.[\d]{3}Z/,'')
        proposalList[k].dates = createTime
        if (proposalList[k].user_pic.indexOf('http') === -1) {
          proposalList[k].user_pic = URL + proposalList[k].user_pic
        }
      }
      this.setData({
        proposalInfo:proposalList
      })
    })
  },
  //删除个人建议信息
  removePersonalAdvice(e){
    const _this = this
    const id = e.currentTarget.dataset.id
    request({url:'/my/releaseProposal/delect_proposal',
    data:{
      id
    },
    header:{"Content-Type": "application/x-www-form-urlencoded"},
    method:"post"
    })
    .then(result=>{
      if(result.data.status === 0){
        wx.showLoading({
          title: '删除成功！',
          icon: 'loading',
          duration:1500,
          success:function(){
            const cid = _this.data.detailsList[0].id
            _this.getProposalInfo(cid)
            _this.getUserProposalList(cid)
          }
        })
      }else{
        wx.showLoading({
          title: '删除失败！',
          icon: 'loading',
          duration:1500,
        })
      }
    })
  }
})
