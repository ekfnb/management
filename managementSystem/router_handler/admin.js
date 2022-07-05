const db = require('../db/index')
//导入Token包
const jwt = require('jsonwebtoken')
//导入全局配置文件
const config = require('../config')
const { json } = require('body-parser')
//登录路由处理函数
exports.admin_login = (req,res)=>{
    //接收表单数据 
    const userInfo = req.body
    //定义sql语句
    const sql = 'select * from admin_users where username=?'
    db.query(sql,userInfo.username,(err,results)=>{
        //sql语句执行失败
        if(err) return res.errors(err)
        //执行成功,但是获取不到数据
        if(results.length !== 1) return res.errors('账号或密码错误')
        //判断密码是否正确
        if(userInfo.password !== results[0].password) return res.errors('账号或密码错误!')
        const user = { ...results[0],password:'',user_pic:''}
        //对用户信息进行加密
        const tokenStr = jwt.sign(user,config.jwtSecretKey,{expiresIn:'10h'});
        res.send({
            status:0,
            message:'登录成功！',
            token: 'Bearer ' + tokenStr
        })
    })
}