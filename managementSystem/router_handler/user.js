const db = require('../db/index')
//导入Token包
const jwt = require('jsonwebtoken')
//导入全局配置文件
const config = require('../config')
//处理用户注册处理函数模块
exports.regUser = (req,res)=>{
    const userinfo = req.body
    //定义查询的sql语句
    const sql = 'select * from ev_users where username = ?'
    db.query(sql,userinfo.username,(err,results)=>{
        if(err){ return res.errors(err)}
        //判断用户是否存在
        if(results.length > 0){
            //返回错误消息给用户
            return res.errors('用户名被占用,请更换用户名')
        }
        //定义插入数据的sql语句
        const sqlinsert = 'insert into ev_users set ?'
        //掉db执行sql语句
        db.query(sqlinsert,userinfo,(err,results)=>{
            //判断sql语句是否执行成功
            if(err) return res.errors(err)
            //判断影响行数是否为1
            if(results.affectedRows !== 1) return res.errors('注册用户失败，请稍后再试！')
            //注册用户成功
            res.errors('用户注册成功！',0)
        })
    })
}
//登录路由处理函数
exports.login = (req,res)=>{
    //接收表单数据
    const userInfo = req.body
    // console.log(userInfo)
    //定义sql语句
    const sql = 'select * from ev_users where username=?'
    db.query(sql,userInfo.username,(err,results)=>{
        //sql语句执行失败
        if(err) return res.errors(err)
        //执行成功,但是获取不到数据
        if(results.length !== 1) return res.errors('账号或密码错误')
        //判断密码是否正确
        if (userInfo.password !== results[0].password)
            return res.errors('账号或密码错误!')
        const user = { ...results[0],password:'',user_pic:''}
        const id = results[0].id
        // console.log(user);
        //对用户信息进行加密
        const tokenStr = jwt.sign(user,config.jwtSecretKey,{expiresIn:'10h'});
        const user_id = 'select id from ev_users where username=?'
        db.query(user_id,userInfo.username,(err,results)=>{
            if(err) return ers.errors(err)
            res.send({
                status:0,
                message:'登录成功！',
                token: 'Bearer ' + tokenStr,
                id:id
            })
        })
    })
}