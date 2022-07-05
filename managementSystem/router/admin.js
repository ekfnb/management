const express = require('express')
const router = express.Router()
//导入路由函数处理模块
const adminHandler = require('../router_handler/admin')
//导入@escook/express-joi
const expressJoi = require('@escook/express-joi')
const { reg_login_schema } = require('../schema/user')
//管理员账户登录登录路由
router.all('/admin_login',expressJoi(reg_login_schema),adminHandler.admin_login)

module.exports = router