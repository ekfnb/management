<template>
    <div >
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>失败项目管理</el-breadcrumb-item>
            <el-breadcrumb-item>审核失败项目列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-input size="mini" v-model="name" placeholder="请输入项目名">
            </el-input>
            <el-button size="mini" icon="el-icon-search" type="primary" @click="search"></el-button>
            <el-table
            :data="tableData"
            class="infinite-list-item"
            style="width: 95%">
                <el-table-column
                    label="发布时间"
                    sortable
                    width="180"
                    prop="dates"
                    >
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="项目名称">
                </el-table-column>
                <el-table-column
                    label="项目图片"
                    width="80">
                    <template slot-scope="scope">
                        <img :src="scope.row.user_pic" width="50">
                    </template>
                </el-table-column>
                <el-table-column
                    prop="alias"
                    label="项目描述">
                </el-table-column>
                <el-table-column label="操作" width="190">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, tableData)" type="primary" icon="el-icon-edit">修改</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, tableData)" 
                        icon="el-icon-delete"></el-button>
                    </template>
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
export default {
    data(){
        return{
            name:'',
            tableData: [],
            layoutData:{
                total:5,
                pageNumber:1,
                pageSize:5
            }
        }
    },
    created(){
        this.getReleaseList()
    },
    methods:{
        //获取项目列表函数
        getReleaseList(){
            const layoutData = this.layoutData
            // this.Url = Url
            ajax({url:"/my/projectFailed/getProjectFailedPage",
            data:layoutData,
            header:{"Content-Type": "application/x-www-form-urlencoded"},
            method:"post" 
            }).then(res=>{
                this.tableData = res.data
                const dynamicList = res.data
                for(var k in dynamicList){
                    var date = new Date(dynamicList[k].dates).toJSON()
                    var createTime = new Date(+new Date(date) + 8 *3600 *1000).toISOString().replace(/T/g,'--').replace(/\.[\d]{3}Z/,'')
                    this.tableData[k].dates = createTime
                    var user_pic = Url + dynamicList[k].user_pic
                    this.tableData[k].user_pic = user_pic
                }
                this.layoutData.total = res.total
            })
        },
        //实现搜索功能处理函数
        search(){
            if(this.name !== ''){
                this.tableData = []
                ajax({url:"/my/query/fail_query",
                data:{name:this.name},
                header:{"Content-Type": "application/x-www-form-urlencoded"},
                method:"post" 
                }).then(res=>{
                    this.tableData = res.data
                    const dynamicList = res.data
                    for(var k in dynamicList){
                        var date = new Date(dynamicList[k].dates).toJSON()
                        var createTime = new Date(+new Date(date) + 8 *3600 *1000).toISOString().replace(/T/g,'--').replace(/\.[\d]{3}Z/,'')
                        this.tableData[k].dates = createTime
                        var user_pic = Url + dynamicList[k].user_pic
                        this.tableData[k].user_pic = user_pic
                    }
                    this.layoutData.total = res.data.length
                })
            }else{
                this.getReleaseList()
            }
        },
        //删除当前数据处理函数
        handleDelete(index,row){
            const id = row[index].id;
            ajax({url:"/my/projectFailed/delectProjectFailed",
            data:{id},
            header:{"Content-Type": "application/x-www-form-urlencoded"},
            method:"post"
            }).then(res=>{
                if(res.status === 0){
                    row.splice(index,1);
                    Message({
                        showClose: true,
                        message: '删除成功',
                        type: 'success'
                    });
                }else{
                    Message({
                        showClose: true,
                        message: '删除失败',
                        type: 'error'
                    });
                }
            })
        },
        // 项目编辑处理函数
        handleEdit(index, tableData){
            console.log();
            this.$router.push({
                path:'/update_fail',
                query:{
                    id:tableData[index].id
                }
            })
        },
        //设置每页能显示的条目数
        handleSizeChange(val) {
            this.layoutData.pageSize = val
            this.getReleaseList()
        },
        //获取当前页处理方法
        handleCurrentChange(val) {
            this.layoutData.pageNumber = val
            this.getReleaseList()
        },
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
.el-input{
    margin-left: 20px;
    width: 300px;
}
.el-button{
    margin-left: 10px;
    height: 27px;
}
.el-table{
    margin: 0 auto;
}
</style>