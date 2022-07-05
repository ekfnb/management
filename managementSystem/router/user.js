const express = require('express')
const router = express.Router()
//导入路由模块处理函数
const userHandler = require('../router_handler/user')
//导入@escook/express-joi
const expressJoi = require('@escook/express-joi')
const { reg_login_schema } = require('../schema/user')
const { res_regser_schema } = require('../schema/user')
//注册用户请求
router.post('/regser',expressJoi(res_regser_schema),userHandler.regUser)
//登录用户请求
router.all('/login',expressJoi(reg_login_schema),userHandler.login)

module.exports = router