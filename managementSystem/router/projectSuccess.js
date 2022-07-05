const express = require('express')
const router = express();

//获取成功项目数据路由
const projectSuccess = require('../router_handler/projectSuccess')
router.get('/getProjectSuccess',projectSuccess.get_project_success)
//获取成功项目分页路由
router.post('/getProjectSuccessPage',projectSuccess.get_project_success_page)
//通过id获取成功项目数据路由
router.post('/getProjectSuccess_id',projectSuccess.get_project_success_id)
//添加成功项目路由
router.post('/addProjectSuccess',projectSuccess.add_project_success)
//更新成功项目路由
router.post('/updateProjectSuccess',projectSuccess.update_project_success)
//删除成功项目路由
router.post('/delectProjectSuccess',projectSuccess.delect_project_success)

module.exports = router