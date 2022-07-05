// const send = require('send')
const db = require('../db/index')
//获取用户基本信息的函数
exports.getuserinfo = (req,res)=>{
    const sql = 'select id,username,nickname,email,user_pic from ev_users where id=?'
    //执行sql语句
    db.query(sql,req.body.id,(err,results)=>{
        if(err) return res.errors(err)
        if(results.length !== 1) return res.errors('获取用户信息失败')
        //获取成功
        res.send({
            status:0,
            message:'获取用户信息成功',
            data:results[0]
        })
    })
}
//更新用户信息的函数
exports.updateUserInfo = (req,res)=>{
    //定义更新的sql语句
    const bodys = req.body 
    const selectSql = 'select username,nickname,email from ev_users where id=?'
    db.query(selectSql,bodys.id,(err,result)=>{
        if(err) return res.errors(err)
        if (result[0].username === bodys.username && result[0].nickname === bodys.nickname && result[0].email === bodys.email) {
            return res.errors('更新用户信息不能重复!')
        }
        const sql = 'update ev_users set ? where id=?'
        db.query(sql,[bodys,bodys.id],(err,results)=>{
            if(err) return res.errors(err)
            //sql语句成功，不影响sql数据改变也是失败
            // if(results.affectedRows !== 1) return res.errors('更新用户信息不能重复')
            res.errors('更新用户信息成功',0)
        })
    })
}
//修改密码的路由函数
exports.updatePassword = (req,res)=>{
    const sql = 'select * from ev_users where id=?'
    db.query(sql,req.user.id,(err,results)=>{
        //sql语句是否执行失败
        if(err) return res.errors(err)
        //判断用户是否存在
        if(results.length !== 1)return errors('用户不存在')
        
        //判断用户的旧密码是否于数据库密码保持一致
        const compareResult = req.body.oldPwd == results[0].password
        if(req.body.oldPwd !== results[0].password) return res.errors('旧密码错误！')
        const sqlOldPwd = 'update ev_users set password=? where id=?'
        const newPwd = req.body.newPwd
        db.query(sqlOldPwd,[newPwd,req.user.id],(err,results)=>{
            if(err) return res.errors(err)
            res.errors('修改密码成功！',0)
        })
    })
}
//更换头像路由
exports.updateAvatar = (req,res)=>{
    const sql = 'update ev_users set user_pic=? where id=?'
    db.query(sql,[req.body.avatar,req.user.id],(err,results)=>{
        if(err) return res.errors(err)
        if(results.affectedRows !== 1)return res.errors('更换头像失败！')
        res.errors('更换头像成功',0);
    })
}