const express = require('express')
const router = express.Router()
const query = require('../router_handler/query')
//搜索全部表格项目
router.post('/fuzzy_query',query.fuzzy_query)
//搜索预发布项目
router.post('/release_query',query.release_query)
//搜索审核项目
router.post('/examine_query',query.examine_query)
//搜索成功项目
router.post('/success_query',query.success_query)
//搜索失败项目
router.post('/fail_query',query.fail_query)
module.exports = router