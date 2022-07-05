const db = require('../db/index')
//获取投票处理函数
exports.get_vote_result = (req,res)=>{
    const sql = 'select * from vote_result where is_delete = 0'
    db.query(sql,(err,results)=>{
        if(err) return res.errors(err)
        res.send({
            status:0,
            message:'获取投票数据成功',
            data:results
        })
    })
}
//通过id获取投票处理函数
exports.get_vote_result_id = (req,res)=>{
    const sql = 'select * from vote_result where vote_project=?'
    db.query(sql,req.body.vote_project,(err,results)=>{
        if(err) return res.errors(err)
        res.send({
            status:0,
            message:'获取投票数据成功',
            data:results
        })
    })
}
//跟新投票结果数
exports.add_vote_result = (req,res)=>{
    const bodys = req.body
    const select_project = 'select * from vote_result where vote_project=?'
    db.query(select_project,bodys.vote_project,(err,results)=>{
        if(err) return res.errors(err)
        //如果账号有这条数据，折直接取出数据进行操作
        if(results.length > 0){
            const success = Number(bodys.success)
            const data = {success:results[0].success,failed:results[0].failed}
            //判断是否为投票赞成数
            if(success === 1){
                const suc = 'update vote_result set success=? where vote_project=?'
                db.query(suc,[Number(data.success)+1,bodys.vote_project],(err,results)=>{
                    if(err) return res.errors(err)
                    if(results.affectedRows !== 1) return res.errors('投票失败')
                    return res.errors('投票成功',0)
                })
                return
            }
            else{
                const fai = 'update vote_result set failed=? where vote_project=?'
                db.query(fai,[Number(data.failed)+1,bodys.vote_project],(err,results)=>{
                    if(err) return res.errors(err)
                    if(results.affectedRows !== 1) return res.errors('投票失败')
                    return res.errors('投票成功',0)
                })
                return
            }
        }
        //如果账号没有这条数据，则添加该数据
        const add_data = 'insert into vote_result set ?'
        db.query(add_data,{vote_project:bodys.vote_project,success:bodys.success,failed:bodys.failed},(err,results)=>{
            if(err) return res.errors(err)
            if(results.affectedRows !== 1) return res.errors('新增数据失败!')
            res.send('新建项目投票数据成功！')
        })
    })
}
//删除投票结果数
exports.delete_vote_result = (req,res)=>{
    const artcate = req.body
    const sql = 'select * from vote_result where id=?'
    db.query(sql,artcate.id,(err,results)=>{
        if(err) return res.errors(err)
        if(results.length !== 1) return res.errors('项目不存在')
        const update_sql = 'update vote_result set is_delete = 1 where id=?'
        db.query(update_sql,artcate.id,(err,results)=>{
            if(err) return res.errors(err)
            res.errors('删除成功！',0)
        })
    })
}