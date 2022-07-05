const db = require('../db/index')
//获取投票项目的路由函数
exports.get_projectVote = (req,res)=>{
    const sql = 'select * from project_vode where is_delete=0 order by id desc'
    db.query(sql,(err,results)=>{
        if(err) return res.errors(err)
        res.send({
            status:0,
            message:'获取投票项目完成！',
            data:results
        })
    })
}
//获取投票项目分页数据
exports.get_projectVote_page = (req,res)=>{
    // console.log(req.body);
    const a= JSON.parse(req.body.pageNumber)//页数
    const b= JSON.parse(req.body.pageSize) //条数
    const c=(a-1)*b;//需要查询的页数/条数
    const sqlTotal = 'select count(*) as total from project_vode where is_delete=0 order by id desc'
    db.query(sqlTotal,(err,results)=>{
        const total = results[0].total
        const sql = 'select * from project_vode where is_delete=0 order by id desc limit ?,?'
        db.query(sql,[c,b],(err,results)=>{
            res.send({
                status:0,
                message:'获取项目成功',
                data:results,
                total
            })
        })
    })
}
//通过id获取投票项目的路由函数
exports.get_projectVote_id = (req,res)=>{
    const sql = 'select * from project_vode where id=?'
    db.query(sql,req.body.id,(err,results)=>{
        if(err) return res.errors(err)
        res.send({  
            status:0,
            message:'获取项目成功',
            data:results,
        })
    })
}
//添加项目投票路由处理函数
exports.add_projectVote = (req,res)=>{
    const artcate = req.body;
    if (artcate.id) {
        delete artcate.id
    }
    const sql = 'insert into project_vode set ?'
    db.query(sql,artcate,(err,results)=>{
        if(err) return res.errors(err)
        if(results.affectedRows !== 1) return res.errors('新增项目失败')
        res.errors('添加项目成功',0)
    })
}
//更新项目投票路由处理函数
exports.update_projectVote = (req,res)=>{
    const artcate = req.body
    const sql = 'update project_vode set ? where id=?'
    db.query(sql,[artcate,artcate.id],(err,results)=>{
        if(err) return res.errors(err)
        if(results.affectedRows !== 1) return res.errors('更新项目失败')
        res.errors('更新项目成功',0);
    })
}
//删除项目投票处理函数
exports.delect_projectVote = (req,res)=>{
    const artcate = req.body
    const sql = 'select * from project_vode where id=?'
    db.query(sql,artcate.id,(err,results)=>{
        if(err) return res.errors(err)
        if(results.length !== 1) return res.errors('项目不存在')
        const update_sql = 'update project_vode set is_delete = 1 where id=?'
        db.query(update_sql,artcate.id,(err,results)=>{
            if(err) return res.errors(err)
            res.errors('删除成功！',0)
        })
    })
}