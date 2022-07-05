<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>项目审核管理</el-breadcrumb-item>
            <el-breadcrumb-item>审核结果</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
        <el-table
        :data="tableData"
        style="width: 95%">
            <el-table-column
                prop="vote_project"
                label="项目名称"
                width="180">
            </el-table-column>
            <el-table-column
                prop="success"
                label="赞成数"
                width="180">
            </el-table-column>
            <el-table-column
                prop="failed"
                label="不赞成数">
            </el-table-column>
             <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button @click="handleDelete(scope.$index, tableData)" size="mini" icon="el-icon-delete" type="danger"></el-button>
                </template>
            </el-table-column>
        </el-table>
        </el-card>
    </div>
</template>

<script>
import { ajax } from '../../api/router'
import { Message } from 'element-ui'
export default {
    data(){
        return{
            tableData: []
        }
    },
    created(){
        this.getExamineResults()
    },
    methods:{
        getExamineResults(){
            ajax({url:'/my/voteResult/getvoteResult',
            method:"get"}).then(res => {
                this.tableData = res.data
            })
        },
        //删除列表数据
        handleDelete(index,row){
            const id = row[index].id;
            ajax({url:"/my/voteResult/deletevoteResult",
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
</style>