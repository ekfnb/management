const express = require('express')
const router = express();
//获取项目数据路由
const artcate = require('../router_handler/artcate')
router.get('/cates',artcate.get_artcate)
//获取项目分页路由
router.post('/cates_page',artcate.get_artcate_page)
//通过id获取项目数据路由
router.post('/cates_id',artcate.get_artcate_id)
//添加项目路由
router.post('/add_artcate',artcate.add_artcate)
//更新项目路由
router.post('/update_artcate',artcate.update_artcate)
//删除项目路由
router.post('/delect_artcate',artcate.delect_artcate)

module.exports = router