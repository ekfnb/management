const express = require('express')
const router = express();

//获取投票项目数据路由 
const projectVote = require('../router_handler/projectVote')
router.get('/getProjectVote',projectVote.get_projectVote)
//获取分类数据路由
router.post('/getProjectVotePage',projectVote.get_projectVote_page)
//通过id获取投票项目数据路由
router.post('/get_projectVote_id',projectVote.get_projectVote_id)
//添加投票项目路由
router.post('/addProjectVote',projectVote.add_projectVote)
//更新投票项目路由
router.post('/updateProjectVote',projectVote.update_projectVote)
//删除投票项目路由
router.post('/delectProjectVote',projectVote.delect_projectVote)

module.exports = router