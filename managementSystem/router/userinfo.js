const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')

const userinfoHandler = require('../router_handler/userinfo')
//获取客户基本信息的路由
router.post('/userinfo',userinfoHandler.getuserinfo)

//更新用户信息的路由
const { update_userinfo_schema } = require('../schema/user')
router.post('/userinfo_id',expressJoi(update_userinfo_schema),userinfoHandler.updateUserInfo)

//修改密码的路由
const { update_password_schema } = require('../schema/user')
router.post('/updatepwd',expressJoi(update_password_schema),userinfoHandler.updatePassword)

//更换头像路由
const { update_avatar_schema } =require('../schema/user')
router.post('/update/avater',expressJoi(update_avatar_schema),userinfoHandler.updateAvatar)

module.exports = router