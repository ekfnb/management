<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>项目发布管理</el-breadcrumb-item>
            <el-breadcrumb-item>项目建议</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 项目列表以及目录 -->
        <el-card>
            <el-input size="mini" v-model="name" placeholder="请输入项目名">
            </el-input>
            <el-button size="mini" icon="el-icon-search" type="primary" @click="search"></el-button>
            <el-table
                v-if="tableData"
                :data="tableData"
                style="width: 100%"
                >
                <el-table-column type="expand" label="展开建议" width="80">
                    <!-- v-for="(item1,i1) in scope.row.children" :key="id" -->
                    <template slot-scope="scope" style="border:1px solid #ccc">
                        <el-card style="width:96%; margin:0 auto;">
                            <el-table :data="scope.row.children"
                            >
                                <el-table-column 
                                type="index">
                                </el-table-column>
                                <el-table-column
                                prop="dates"
                                label="建议发布时间"
                                sortable
                                width="170">
                                </el-table-column>
                                <el-table-column
                                prop="nickName"
                                label="用户名"
                                width="110">
                                </el-table-column>
                                <el-table-column
                                prop="proposal"
                                label="建议信息"
                                width="450">
                                </el-table-column>
                                <el-table-column label="操作" width="80">
                                    <template slot-scope="scop">
                                        <el-button
                                            size="mini"
                                            type="danger"
                                            @click="handleDelete(scop.$index,scope.row.children)" icon="el-icon-delete">
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-card>
                    </template>
                </el-table-column>
                <el-table-column
                prop="dates"
                label="发布时间"
                sortable
                width="180">
                </el-table-column>
                <el-table-column
                prop="name"
                label="项目名称"
                width="180">
                </el-table-column>
                <el-table-column
                label="项目图片"
                width="130">
                <template slot-scope="scope">
                    <img :src="scope.row.user_pic" width="50">
                </template>
                </el-table-column>
                <el-table-column
                prop="alias"
                label="项目描述">
                </el-table-column>
            </el-table>
            <div style="margin:0 auto;width:400px">
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="layoutData.pageNumber"
                :page-sizes="[3, 5, 8, 10]"
                :page-size="layoutData.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="layoutData.total">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>
<script>
import { Message } from 'element-ui'
import { ajax,Url } from '../../api/router'
export default ({
    data() {
        return{
            //双向数据绑定搜索框属性
            name:'',
            tableData: 
            [{
                dates: '',
                user_pic:'',
                name: '',
                alias: '',
                children:
                [{
                    dates: '',
                    proposal: '',
                    nickName: ''
                }]
            }],
            layoutData:{
                total:0,
                pageNumber:1,
                pageSize:5
            }
        }
    },
    created(){
        this.getProposal()
    },
    methods:{
        //获取表格以及建议数据，并改为树形结构数据
        getProposal(){
            const layoutData = this.layoutData
            ajax({url:"/my/artCateRouter/cates_page",
            data:layoutData,
            header:{"Content-Type": "application/x-www-form-urlencoded"},
            method:"post"})
            .then(results=>{
                const dynamicList = results.data
                for(var k in dynamicList){
                    var date = new Date(dynamicList[k].dates).toJSON()
                    var createTime = new Date(+new Date(date) + 8 *3600 *1000)
                    .toISOString().replace(/T/g,'--')
                    .replace(/\.[\d]{3}Z/,'')
                    dynamicList[k].dates = createTime
                    dynamicList[k].user_pic = Url + dynamicList[k].user_pic
                    dynamicList[k]['children'] = []
                }
                //总条数
                this.layoutData.total = results.total
                ajax({url:'/my/releaseProposal/getRelease'}).then(results=>{
                    const prop = results.data
                    for(var j in prop){
                        var date = new Date(prop[j].dates).toJSON()
                        var createTime = new Date(+new Date(date) + 8 *3600 *1000)
                        .toISOString().replace(/T/g,'--')
                        .replace(/\.[\d]{3}Z/,'')
                        prop[j].dates = createTime
                    }
                    prop.forEach((prop)=>{
                        dynamicList.forEach((dy,index)=>{
                            if (dy.id === prop.project_id) {
                                dy.children.push(prop)
                            }
                        })
                    })
                })
                this.tableData = dynamicList
            })
        },
        //搜索功能处理函数
        search(){
            if(this.name !== ''){
                this.tableData = []
                const name = this.name
                ajax({url:"/my/query/release_query",
                data:{name:name},
                header:{"Content-Type": "application/x-www-form-urlencoded"},
                method:"post"})
                .then(results=>{
                    const dynamicList = results.data
                    for(var k in dynamicList){
                        var date = new Date(dynamicList[k].dates).toJSON()
                        var createTime = new Date(+new Date(date) + 8 *3600 *1000).toISOString().replace(/T/g,'--').replace(/\.[\d]{3}Z/,'')
                        dynamicList[k].dates = createTime
                        dynamicList[k].user_pic = Url + dynamicList[k].user_pic
                        dynamicList[k]['children'] = []
                    }
                    //总条数
                    this.layoutData.total = results.data.length
                    ajax({url:'/my/releaseProposal/getRelease'}).then(results=>{
                        const prop = results.data
                        for(var j in prop){
                            var date = new Date(prop[j].dates).toJSON()
                            var createTime = new Date(+new Date(date) + 8 *3600 *1000).toISOString().replace(/T/g,'--').replace(/\.[\d]{3}Z/,'')
                            prop[j].dates = createTime
                        }
                        prop.forEach((prop)=>{
                            dynamicList.forEach((dy,index)=>{
                                if (dy.id === prop.project_id) {
                                    dy.children.push(prop)
                                }
                            })
                        })
                    })
                    this.tableData = dynamicList
                })
            }else{
                this.getProposal()
            }
        },
        //删除建议处理方法
        handleDelete(index,row){
            const id = row[index].id
            ajax({url:"/my/releaseProposal/delect_proposal",
            data:{id},
            header:{"Content-Type": "application/x-www-form-urlencoded"},
            method:"post"
            }).then(res=>{
                if(res.status === 0){
                    row.splice(index,1);
                    Message({
                        showClose: true,
                        message: '删除建议成功！',
                        type: 'success'
                    });
                }else{
                    Message({
                        showClose: true,
                        message: '删除建议失败！',
                        type: 'error'
                    });
                }
            })
        },
        //设置每页能显示的条目数
        handleSizeChange(val) {
            this.layoutData.pageSize = val
            this.getProposal()
        },
        //获取当前页
        handleCurrentChange(val) {
            this.layoutData.pageNumber = val
            this.getProposal()
        },
    }
})
</script>
<style scoped>
.el-breadcrumb{
    margin: 10px 20px;
}
.el-input{
    width: 300px;
}
.el-button{
    margin-left: 10px;
    height: 27px;
}
.el-card{
    margin:15px 20px;
}
</style>
