const express = require('express')
const app = express()
const path = require('path')
const Joi = require('joi')
const router = require('./router/user')
const admin = require('./router/admin')
const admin_info = require('./router/admin_info')
const upload = require('./router/upload')
const userinfoRouter = require('./router/userinfo')
const cates = require('./router/artcate')
const projectVote = require('./router/projectVote')
const projectSuccess = require('./router/projectSuccess')
const projectFailed = require('./router/projectFailed')
const releaseProposal = require('./router/release_proposal')
const voteResult = require('./router/voteResult')
const query = require('./router/query')
const getIp = require('./utils/get_ip')
const picture = require('./router/picture')
//导入配置cors中间件,解决跨域问题
const cors = require('cors')
app.use(cors())
//配置表单数据解析的全局中间件
app.use(express.urlencoded({extended: false}))
//配置错误的全局中间件
app.use((req,res,next)=>{
    //status为1，表示失败
    res.errors = (err,status = 1)=>{
        res.send({
            //状态
            status,
            //状态描述，判断是err错误对象还是字符串
            message:err instanceof Error ? err.message : err,
            //newpwd:newPwd
        })
    }
    next()
})

//解析token的中间件
const expressJWT = require('express-jwt')
const config = require('./config')
app.use(expressJWT({secret:config.jwtSecretKey}).unless({path:[/^\/api/]}))

//登录/注册路由模块
app.use( '/api',router)
//导入用户信息模块
app.use('/my',userinfoRouter)
//导入管理员登录路由模块
app.use( '/api',admin)
//导入获取管理员信息模块
app.use( '/my',admin_info)
//导入图片上传接口
app.use('/my/image',upload)
//导入项目发布模块
app.use('/my/artCateRouter',cates)
//导入投票审核项目路由模块
app.use('/my/projectVote',projectVote)
//导入投票成功项目路由模块
app.use('/my/projectSuccess',projectSuccess)
//导入投票失败项目路由
app.use('/my/projectFailed',projectFailed)
//导入用户建议的路由
app.use('/my/releaseProposal',releaseProposal)
//导入投票数据的收集
app.use('/my/voteResult',voteResult)
//导入查询路由模块
app.use('/my/query',query)
//静态文件托管
app.use('/api',express.static(path.join(__dirname,'public')))
//获取本机ip地址模块
app.use('/my',getIp)
//获取轮播图数据路由挂载
app.use('/my',picture)
//定义全局效验错误的中间件
app.use((err,req,res,next)=>{
    if(err instanceof Joi.ValidationError) return res.errors(err)
    if(err.name === 'UnauthorizedError'){
        return res.errors('身份验证失败')
    }
    //未知错误
    res.errors(err)
})
app.listen(3009,()=>{
    console.log('服务启动成功，端口：3309！')
})