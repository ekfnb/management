const db = require('../db/index')

//获取管理员用户基本信息的函数
exports.getAdminInfo = (req,res)=>{
    const sql = 'select id,username,nickname,email,user_pic,telephone from admin_users'
    //执行sql语句
    db.query(sql,req.user.id,(err,results)=>{
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