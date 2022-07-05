const express = require('express');
const router = express.Router();
const db = require('../db/index')

router.get('/picture',(req, res) =>{
    const sql = 'select * from ev_artide_cate where is_delete=0 order by id desc limit 0,5'
    db.query(sql,(err,results)=>{
        if(err) return res.errors(err)
        res.send({
            status:0,
            message:'获取轮播图成功',
            data:results,
        })
    })
});

module.exports = router;