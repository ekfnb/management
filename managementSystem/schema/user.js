//导入joi定义验证规则
const Joi = require('joi')

//效验用户名规则
const username = Joi.string().alphanum().min(3).max(12).required()
//效验密码规则
const password = Joi.string().pattern(/^[\S]{6,15}$/)
//定义验证登录表单数据规则对象
exports.reg_login_schema = {
    body:{
        username,
        password,
    },
}
//昵称规则
const nickname = Joi.string().min(2).required()
//邮箱规则
const email = Joi.string().email().required()
//头像规则
const user_pic = Joi.required()
//定义验证注册表单数据规则对象
exports.res_regser_schema = {
    body:{
        username,
        password,
        nickname,
        email,
        user_pic
    },
}
//定义id,nickname,emai的验证规则
const id = Joi.number().integer().min(1).required()
//更新用户的验证规则
exports.update_userinfo_schema = {
    body:{
        id,
        nickname,
        email,
        username
    },
}
//效验修改密码规则
exports.update_password_schema = {
    body:{
        oldPwd:password,
        newPwd:Joi.not(Joi.ref('oldPwd')).concat(password)
    },
}
//修改用户头像规则
const avatar = Joi.string().required()
exports.update_avatar_schema = {
    body:{
        avatar
    }
}