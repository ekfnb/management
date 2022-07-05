const db = require('../db/index')
//实现查询项目处理函数
exports.fuzzy_query = (req,res)=>{
    const bodys = req.body.name
    //查询发布数据表
    let projectResults = []
    let sql_cate = 'select * from ev_artide_cate'
    if(bodys){
        sql_cate+=' where is_delete=0 and name like ?'
    }
    let param = ["%" + bodys + "%"] 
    db.query(sql_cate,param,(err,results1)=>{
        if(err) return res.errors(err)
        if(results1.length > 0) projectResults.push(results1)
        //project_vode表
        let sql_vote = 'select * from project_vode'
        if(bodys){
            sql_vote+=' where is_delete=0 and name like ?'
        }
        db.query(sql_vote,param,(err,results2)=>{
            if(err) return res.errors(err)
            if(results2.length > 0) projectResults.push(results2)
            //success表
            let sql_success = 'select * from project_success'
            if(bodys){
                sql_success+=' where is_delete=0 and name like ?'
            }
            db.query(sql_success,param,(err,results3)=>{
                if(err) return res.errors(err)
                if(results3.length > 0) projectResults.push(results3)
                //failed表
                let sql_failed = 'select * from project_failed'
                if(bodys){
                    sql_failed+=' where is_delete=0 and name like ?'
                }
                db.query(sql_failed,param,(err,results4)=>{
                    if(err) return res.errors(err)
                    if(results4.length > 0) projectResults.push(results4)
                    if(projectResults.length > 0){
                        res.send({
                            status:0,
                            message:'查询成功',
                            data:projectResults,
                        })
                        return
                    }else{
                        return res.errors('查询不到'+projectResults.length)
                    }
                })
            })
        })
    })
}
//实现查询预发布项目
exports.release_query = (req,res)=>{
    const bodys = req.body.name
    let sql_cate = 'select * from ev_artide_cate'
    if(bodys){
        sql_cate+=' where is_delete=0 and name like ?'
    }
    let param = ["%" + bodys + "%"] 
    db.query(sql_cate,param,(err,results)=>{
        if(err) return res.errors(err)
        res.send({
            status:0,
            message:'查询成功',
            data:results,
        })
    })
}
//实现查询审核项目 
exports.examine_query = (req,res)=>{
    const bodys = req.body.name
    let sql_cate = 'select * from project_vode'
    if(bodys){
        sql_cate+=' where is_delete=0 and name like ?'
    }
    let param = ["%" + bodys + "%"] 
    db.query(sql_cate,param,(err,results)=>{
        if(err) return res.errors(err)
        res.send({
            status:0,
            message:'查询成功',
            data:results,
        })
    })
}
//实现查询审核通过项目 
exports.success_query = (req,res)=>{
    const bodys = req.body.name
    let sql_cate = 'select * from project_success'
    if(bodys){
        sql_cate+=' where is_delete=0 and name like ?'
    }
    let param = ["%" + bodys + "%"] 
    db.query(sql_cate,param,(err,results)=>{
        if(err) return res.errors(err)
        res.send({
            status:0,
            message:'查询成功',
            data:results,
        })
    })
}
//实现查询审核失败项目 
exports.fail_query = (req,res)=>{
    const bodys = req.body.name
    let sql_cate = 'select * from project_failed'
    if(bodys){
        sql_cate+=' where is_delete=0 and name like ?'
    }
    let param = ["%" + bodys + "%"] 
    db.query(sql_cate,param,(err,results)=>{
        if(err) return res.errors(err)
        res.send({
            status:0,
            message:'查询成功',
            data:results,
        })
    })
}