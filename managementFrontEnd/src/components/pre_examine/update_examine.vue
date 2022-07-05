<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/examine_list'}">项目审核管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/examine_list'}">发布待审核项目</el-breadcrumb-item>
            <el-breadcrumb-item>编辑项目信息</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-form style="margin:0 auto" :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                <el-form-item label="修改项目名称">
                    <el-input v-model="formLabelAlign.name"></el-input>
                </el-form-item>
                <el-form-item label="修改项目描述">
                    <el-input v-model="formLabelAlign.alias"></el-input>
                </el-form-item>
                <el-form-item label="项目类型" prop="region">
                    <el-select v-model="formLabelAlign.region" placeholder="请选择项目类型">
                        <el-option label="住、学区建设类" value="住、学区建设类"></el-option>
                        <el-option label="活动区建设类" value="活动区建设类"></el-option>
                        <el-option label="校园绿化类" value="校园绿化类"></el-option>
                        <el-option label="校园用水处理类" value="校园用水处理类"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="修改图片">
                    <el-upload
                        class="upload-demo"
                        :action="http"
                        list-type="picture"
                        :on-success="uploadSuccess"
                        :headers = "headerObj"
                        :file-list="fileList"
                        >
                        <el-button size="small" type="primary" round >图片上传</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="修改项目内容">
                    <quill-editor v-model="formLabelAlign.articleContent"></quill-editor>
                </el-form-item>
                <el-button type="primary" @click="handlerRelease('/my/projectVote/updateProjectVote',0)">修改项目</el-button>
                <el-button style="margin-left:30px" type="primary" @click="handlerRelease('/my/projectSuccess/addProjectSuccess',1)">审核通过</el-button>
                <el-button style="margin-left:30px" type="primary" @click="handlerRelease('/my/projectFailed/addProjectFailed',2)">审核失败</el-button>
            </el-form>
        </el-card>
    </div>
</template>
<script>
import { Message } from 'element-ui';
import { ajax,Url } from '../../api/router'
export default {
    data(){
        return{
            //发送ajax请求的路径,传递项目图片
            http:Url+'/my/image/add_file',
            //获取项目数组
            tableData: [],
            //设置elementui中table排版属性
            labelPosition: 'top',
            //双向绑定到文本内容
            formLabelAlign: {
                name: '',
                alias: '',
                articleContent: '',
                region:''
            },
            //设置请求头对象
            headerObj:{
                Authorization:sessionStorage.getItem('token'),
            },
            //显示原始图片
            fileList:[{
                name:'原始项目图片',
                url: ''
            }],
            //上传图片成功接收客户端数据
            getResponse:[],
        }
    },
    created(){
        this.getUpdateData()
    },
    // 
    methods:{
        //获取需要修改项目的信息
        getUpdateData(){
            const id = this.$route.query.id
            ajax({url:'/my/projectVote/get_projectVote_id',
            data:{id},
            header:{"Content-Type": "application/x-www-form-urlencoded"},
            method:"post"
            }).then(res=>{
                // console.log(res.data[0]);
                this.tableData = res.data
                const dynamicList = res.data
                for(var k in dynamicList){
                    var date = new Date(dynamicList[k].dates).toJSON()
                    var createTime = new Date(+new Date(date) + 8 *3600 *1000).toISOString().replace(/T/g,'--').replace(/\.[\d]{3}Z/,'')
                    this.tableData[k].dates = createTime
                }
                this.formLabelAlign.name = this.tableData[0].name
                this.formLabelAlign.region = this.tableData[0].region
                this.formLabelAlign.alias = this.tableData[0].alias
                this.formLabelAlign.articleContent = this.tableData[0].articleContent
                this.fileList[0].url = Url + this.tableData[0].user_pic
            })
        },
        //图片上传成功回调
        uploadSuccess(response, file, fileList) {
            Message({
                showClose: true,
                message: '图片上传成功',
                type: 'success'
            });
            this.getResponse = file.response
        },
        //修改项目上传功能
        handlerRelease(url,index){
            const region = this.formLabelAlign.region
            const id = this.$route.query.id
            const name = this.formLabelAlign.name
            const alias = this.formLabelAlign.alias
            const articleContent = this.formLabelAlign.articleContent
            if (this.getResponse.length !== 0) {
                const user_pic = this.getResponse.response.filepath
                this.sendAjax(id,name,alias,articleContent,user_pic,region,url,index)
            }else{
                const user_pic = this.fileList[0].url.replace(Url,'')
                
                this.sendAjax(id,name,alias,articleContent,user_pic,region,url,index)
            }
        },
        //修改上传项目方法
        sendAjax(id,name,alias,articleContent,user_pic,region,url,index){
            ajax({url:url,
            data:{ 
                id,
                name,
                alias,
                articleContent,
                user_pic,
                region
            },
            header:{"Content-Type": "application/x-www-form-urlencoded"},
            method:"post"
            }).then(results => {
                if(results.status === 0){
                    if(index === 0){
                        Message({
                            showClose: true,
                            message: '修改审核项目成功',
                            type: 'success'
                        });
                    }else if(index === 1){
                        Message({
                            showClose: true,
                            message: '上传审核通过项目成功',
                            type: 'success',
                            duration:'1000',
                            onClose:()=>{
                                this.$router.push({
                                    path:'/success_list',
                                })
                            }
                        });
                    }else{
                        Message({
                            showClose: true,
                            message: '上传审核失败项目成功',
                            type: 'success',
                            duration:'1000',
                            onClose:()=>{
                                this.$router.push({
                                    path:'/fail_list',
                                })
                            }
                        });
                    }
                    
                }else{
                     Message({
                        showClose: true,
                        message: '操作项目失败',
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
.el-main{
    padding: 0;
    margin: 10px 20px;
}
.el-form{
    margin:20px 25% 10px 20px;
    .el-button{
        margin: 10px auto;
    }
}
</style>