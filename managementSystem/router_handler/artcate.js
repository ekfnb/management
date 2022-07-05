const db = require('../db/index')
//获取预发布项目的路由函数
exports.get_artcate = (req,res)=>{
    const sql = 'select * from ev_artide_cate where is_delete=0 order by id desc'
    db.query(sql,(err,results)=>{
        res.send({
            status:0,
            message:'获取项目成功',
            data:results
        })
    })
}
//获取预发布项目分页数据
exports.get_artcate_page = (req,res)=>{
    const numpages= JSON.parse(req.body.pageNumber)//页数
    const totals= JSON.parse(req.body.pageSize) //条数
    const displayPages=(numpages-1)*totals;//需要查询的页数/条数
    const sqlTotal = 'select count(*) as total from ev_artide_cate where is_delete=0 order by id desc'
    db.query(sqlTotal,(err,results)=>{
        const total = results[0].total
        if(err) return res.errors(err)
        const sql = 'select * from ev_artide_cate where is_delete=0 order by id desc limit ?,?'
        db.query(sql,[displayPages,totals],(err,results)=>{
            res.send({
                status:0,
                message:'获取项目成功',
                data:results,
                total
            })
        })
    })
}
//通过id获取预发布项目的路由函数
exports.get_artcate_id = (req,res)=>{
    const sql = 'select * from ev_artide_cate where id=?'
    db.query(sql,req.body.id,(err,results)=>{
        if(err) return res.errors(err)
        res.send({
            status:0,
            message:'获取项目成功',
            data:results,
        })
    })
    //
}
//新增预发布项目路由处理函数
exports.add_artcate = (req,res)=>{
    const artcate = req.body;
    const sql = 'insert into ev_artide_cate set ?'
    db.query(sql,artcate,(err,results)=>{
        if(err) return res.errors(err)
        if(results.affectedRows !== 1) return res.errors('新增项目失败')
        res.errors('添加项目成功',0)
    })
}
//更新预发布项目路由处理函数
exports.update_artcate = (req,res)=>{
    const artcate = req.body
    const sql = 'update ev_artide_cate set ? where id=? '
    db.query(sql,[artcate,artcate.id],(err,results)=>{
        if(err) return res.errors(err)
        if(results.affectedRows !== 1) return res.errors('更新项目失败')
        res.errors('更新项目成功',0);
    })
}
//删除预发布项目处理函数
exports.delect_artcate = (req,res)=>{
    const artcate = req.body
    const sql = 'select * from ev_artide_cate where id=?'
    db.query(sql,artcate.id,(err,results)=>{
        if(err) return res.errors(err)
        if(results.length !== 1) return res.errors('项目不存在')
        const update_sql = 'update ev_artide_cate set is_delete = 1 where id=?'
        db.query(update_sql,artcate.id,(err,results)=>{
            if(err) return res.errors(err)
            res.errors('删除成功！',0)
        })
    })
}
