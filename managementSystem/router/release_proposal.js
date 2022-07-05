
const express = require('express')
const router = express();

//获取建议路由模块
const ReleaseProposal = require('../router_handler/release_proposal')
router.get('/getRelease',ReleaseProposal.get_release)
//通过id获取建议
router.post('/getReleaseProposal',ReleaseProposal.get_release_proposal)
//获取个人建议路由 
router.post('/getPersonalAdvice',ReleaseProposal.get_personal_advice)
//添加建议路由
router.post('/addReleaseProposal',ReleaseProposal.add_release_proposal)
//更新建议个人用户信息路由
router.post('/uploadUserinfo',ReleaseProposal.upload_userinfo)
//删除建议数据路由
router.post('/delect_proposal',ReleaseProposal.delect_proposal)

module.exports = router