const express = require('express')
const router = express();

//获取失败项目数据路由
const projectFailed = require('../router_handler/projectFailed')
router.get('/getProjectFailed',projectFailed.get_project_failed)
//获取失败项目数据分类路由
router.post('/getProjectFailedPage',projectFailed.get_project_failed_page)
//通过id获取失败项目数据路由
router.post('/getProjectFailedId',projectFailed.get_project_failed_id)
//添加失败项目路由
router.post('/addProjectFailed',projectFailed.add_project_failed)
//更新失败项目路由
router.post('/updateProjectFailed',projectFailed.update_project_failed)
//删除失败项目路由
router.post('/delectProjectFailed',projectFailed.delect_project_failed)

module.exports = router