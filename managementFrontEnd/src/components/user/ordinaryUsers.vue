<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>个人中心</el-breadcrumb-item>
            <el-breadcrumb-item>用户信息列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 用户信息列表 -->
        <el-card>
            
        </el-card>
    </div>
</template>

<script>
import { ajax } from '../../api/router'
export default {
    data(){
        return{

        }
    },
    created(){
    },
    methods:{
    }
}
</script>
<style lang="less" scoped>
.el-breadcrumb{
    margin: 10px 0;
    margin-left: 20px;
}
.el-card{
    width:95%;
    margin-left:20px;
}
</style>