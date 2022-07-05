const db = require('../db/index')

//获取建议数据处理函数
exports.get_release = (req,res)=>{
    const sql = 'select * from release_proposal where is_delete=0 order by id desc'
    db.query(sql,(err,results)=>{
        if(err) return res.errors(err)
        res.send({
            status:0,
            message:'获取建议数据成功',
            data:results
        })
    })
}
//通过项目id获取建议数据处理函数
exports.get_release_proposal = (req,res)=>{
    const sql = 'select * from release_proposal where project_id=? and is_delete=0 order by id desc'
    db.query(sql,req.body.project_id,(err,results)=>{
        if(err) return res.errors(err)
        res.send({
            status:0,
            message:'获取建议数据成功',
            data:results
        })
    })
}
//获取用户个人建议数据处理函数
exports.get_personal_advice = (req,res)=>{
    const bodys = req.body
    const sql = 'select * from release_proposal where project_id=? and is_delete=0 and user_id=? order by id desc'
    db.query(sql,[bodys.project_id,bodys.user_id],(err,results)=>{
        if(err) return res.errors(err)
        res.send({
            status:0,
            message:'获取建议数据成功',
            data:results
        })
    })
}
//更新用户个人建议用户信息
exports.upload_userinfo = (req,res)=>{
    const bodys = req.body
    const sql = 'update release_proposal set ? where user_id=?'
    db.query(sql,[bodys,bodys.user_id],(err,results)=>{
        if(err) return res.errors(err)
        //sql语句成功，不影响sql数据改变也是失败
        if(results.affectedRows < 1) return res.errors('信息不变，无需更新')
        res.errors('更新用户信息成功',0)
    })
}
//添加建议数据处理函数
exports.add_release_proposal = (req,res)=>{
    const bodys = req.body
    if(bodys.proposal === ''){
        return res.errors('内容不能为空')
    }else{
        const sql = 'insert into release_proposal set ?'
        db.query(sql,bodys,(err,results)=>{
            if(err) return res.errors(err)
            if(results.affectedRows !== 1) return res.errors('添加建议失败')
            res.errors('添加建议成功',0)
        })
    }
    
}
//删除建议处理函数
exports.delect_proposal = (req,res)=>{
    const artcate = req.body
    const sql = 'select * from release_proposal where id=?'
    db.query(sql,artcate.id,(err,results)=>{
        if(err) return res.errors(err)
        if(results.length !== 1) return res.errors('项目不存在')
        const update_sql = 'update release_proposal set is_delete = 1 where id=?'
        db.query(update_sql,artcate.id,(err,results)=>{
            if(err) return res.errors(err)
            res.errors('删除成功！',0)
        })
    })
}