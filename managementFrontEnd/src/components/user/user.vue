<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>个人中心</el-breadcrumb-item>
            <el-breadcrumb-item>管理员信息</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-container>
                <el-header>管理员信息</el-header>
                <el-main>
                    <el-descriptions  :column="1" border>
                        <el-descriptions-item label="用户名">{{userInfo.nickname}}</el-descriptions-item>
                        <el-descriptions-item label="手机号">{{userInfo.telephone}}</el-descriptions-item>
                        <el-descriptions-item label="邮箱">{{userInfo.email}}</el-descriptions-item>
                        <el-descriptions-item label="居住地" :span="2">钦州市</el-descriptions-item>
                        <el-descriptions-item label="备注">
                            <el-tag size="small">学校</el-tag>
                        </el-descriptions-item>
                        <el-descriptions-item label="联系地址">广西壮族自治区钦州市钦南区北部湾大学</el-descriptions-item>
                    </el-descriptions>
                </el-main>
            </el-container>
        </el-card>
    </div>
</template>

<script>
import { ajax } from '../../api/router'
export default {
    data(){
        return{
            userInfo:[]
        }
    },
    created(){
        this.getUserInfo()
    },
    methods:{
        //获取管理员信息
        getUserInfo(){
            ajax({url:"/my/admin_info",
            method:"get"
            }).then(res=>{
                this.userInfo = res.data
            })
        }
    }
}
</script>

<style lang="less" scoped>
.el-breadcrumb{
    margin: 10px 20px;
}
.el-card{
    margin:15px 20px;
}
.el-header{
    // background-color: #ecf0f1;
    text-align: center;
    font-size: 24px;
    line-height: 60px;
    color: #409EFF;
    margin: 0 auto;
    width: 200px;
    font-weight: bold;
}
.el-main{
    padding: 0;
    margin: 10px 0;
}
</style>