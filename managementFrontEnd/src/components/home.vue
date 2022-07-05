<template>
    <el-container class="home-container">
        <!-- 头部区域 -->
        <el-header>
            <div>
                <img src="../assets/homeLogo.png" width="50" height="50">
                <span>校园规划后台管理系统</span>
            </div>
            <el-button type="info" @click="logout">退出登录</el-button>
        </el-header>
        <!-- 页面主题区 -->
        <el-container>
            <!-- 侧边栏 -->
            <el-aside :width="isCpllapse ? '64px' : '200px'">
                <div class="toggle-button" @click="toggleCollapse">|||</div>
                <el-menu
                background-color="#40739e"
                text-color="#fff"
                active-text-color="#EAB543"
                :collapse="isCpllapse"
                :collapse-transition="false"
                unique-opened
                router>
                    <!-- 一级菜单 -->
                    <el-submenu 
                    :index="item.id + ''"
                    v-for="item in menuData" 
                    :key="item.id">
                        <template slot="title">
                            <i :class="iconsObj[item.id]"></i>
                            <span>{{item.menuName}}</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item 
                        :index="subItem.path"
                        v-for="subItem in item.children"
                        :key="subItem.id"
                        >{{subItem.submenuName}}</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!-- 右侧内容 -->
            <el-container>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </el-container>
</template>
<script>
import { Message } from 'element-ui'
export default ({
    data(){
        return{
            //判断菜单折叠存储变量
            isCpllapse:false,
            //菜单列表数据
            menuData:[
                //个人中心
                {
                    id:0,
                    menuName:'个人中心',
                    children:[
                        {
                            id:1,
                            submenuName:'管理员信息',
                            path:'user'
                        }
                    ]
                },
                //项目发布管理
                {
                    id:1,
                    menuName:'项目发布管理',
                    children:[
                        {
                            id:2,
                            submenuName:'发布项目',
                            path:'pre_release'
                        },
                        {
                            id:3,
                            submenuName:'项目列表',
                            path:'release_list'
                        },
                        {
                            id:4,
                            submenuName:'项目建议',
                            path:'poject_proposal'
                        },
                    ]
                },
                //项目审核管理
                {
                    id:2,
                    menuName:'项目审核管理',
                    children:[
                        {
                            id:7,
                            submenuName:'发布待审核项目',
                            path:'pre_examine'
                        },
                        {
                            id:8,
                            submenuName:'审核项目列表',
                            path:'examine_list'
                        },
                        {
                            id:9,
                            submenuName:'审核结果',
                            path:'examine_results'
                        }
                    ]
                },
                //成功项目管理
                {
                    id:3,
                    menuName:'成功项目管理',
                    children:[
                        {
                            id:10,
                            submenuName:'审核通过项目发布',
                            path:'pre_success'
                        },
                        {
                            id:11,
                            submenuName:'审核通过项目列表',
                            path:'success_list'
                        }
                    ]
                },
                //失败项目管理
                {
                    id:4,
                    menuName:'失败项目管理',
                    children:[
                        {
                            id:12,
                            submenuName:'审核失败项目发布',
                            path:'pre_fail'
                        },
                        {
                            id:13,
                            submenuName:'审核失败项目列表',
                            path:'fail_list'
                        }
                    ]
                }
            ],
            //菜单图标对象
            iconsObj:{
                0:'el-icon-user-solid',
                1:'el-icon-s-order',
                2:'el-icon-question',
                3:'el-icon-s-claim',
                4:'el-icon-s-release'
            }
        }
    },
    created(){

    },
    methods:{
        //退出登录
        logout(){
            //清空临时缓存
            sessionStorage.clear()
            Message({
                showClose: true,
                message: '以退出当前账户！',
                type: 'success',
            });
            this.$router.push('/login')
        },
        // 菜单栏的折叠展开
        toggleCollapse(){
            this.isCpllapse = !this.isCpllapse
        }
    }
})
</script>
<style lang="less" scoped>
.home-container{
    height: 100%;
}
.el-header{
    background-color: #218c74;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 18px;
    .el-button{
        width: 80px;
        height: 30px;
        line-height: 5px;
        padding-left: 10px;
    }
    >div{
        display: flex;
        align-items: center;
        span{
            margin-left: 5px;
        }
    }
}
.el-aside{
    background-color: #40739e;
    .el-menu{
        border-right: 0;
    }
}
.el-main{
    background-color: #f1f6fd;
    padding: 0;
}
.toggle-button{
    background-color: #cc8e35;
    font-size: 10px;
    line-height: 24px;
    color:#fff;
    text-align: center;
    letter-spacing: 0.3em;
    cursor: pointer;
}
</style>