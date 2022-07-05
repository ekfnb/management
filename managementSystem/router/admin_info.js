const express = require('express')
const router = express.Router()

const admininfoHandler = require('../router_handler/admin_info')
//获取客户基本信息的路由
router.get('/admin_info',admininfoHandler.getAdminInfo)

module.exports = router