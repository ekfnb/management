const express = require('express')
const router = express();

//获取投票结果路由模块
const voteResult = require('../router_handler/voteResult')
router.get('/getvoteResult',voteResult.get_vote_result)
//通过id获取投票路由
router.post('/getvoteResult_id',voteResult.get_vote_result_id)
//更新投票结果数路由
router.post('/addvoteResult',voteResult.add_vote_result)
//删除投票结果项
router.post('/deletevoteResult',voteResult.delete_vote_result)

module.exports = router