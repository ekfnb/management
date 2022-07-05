<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>成功项目管理</el-breadcrumb-item>
            <el-breadcrumb-item>审核通过项目发布</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-form :label-position="labelPosition"
            label-width="80px" 
            style="margin:0 auto"
            :model="formLabelAlign"
            :rules="rules">
                <el-form-item label="项目名称" prop="name">
                    <el-input v-model="formLabelAlign.name"></el-input>
                </el-form-item>
                <el-form-item label="项目描述" prop="alias">
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
                <el-form-item label="项目图片上传" prop="alias">
                    <el-upload
                        class="upload-demo"
                        :action="https"
                        list-type="picture"
                        name="file"
                        :multiple="false"
                        :on-success="uploadSuccess"
                        :on-error="uploadError"
                        :headers = "headerObj"
                        :file-list="fileList"
                        :limit="1"
                        >
                        <el-button size="small" type="primary" round >图片上传</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="项目内容">
                    <quill-editor v-model="formLabelAlign.articleContent"></quill-editor>
                </el-form-item>
                <el-button type="primary" @click="handlerRelease">发布项目</el-button>
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
            //ajax请求地址
            https:Url+'/my/image/add_file',
            //elementui中table表单样式属性
            labelPosition: 'top',
            //项目文本框内容
            formLabelAlign: {
                name: '',
                alias: '',
                articleContent: '',
                region:''
            },
            //提交项目效验规则
            rules:{
                name:{ required: true, message: '请输入项目名', trigger: 'blur' },
                alias:{ required: true, message: '请输入项目描述', trigger: 'blur' },
                articleContent:{ required: true, message: '请输入项目内容', trigger: 'blur' },
                region:{required: true, message: '请选择项目类型', trigger: 'blur'}
            },
            //图片提交数据绑定
            fileList:[],
            headerObj:{
                Authorization:sessionStorage.getItem('token'),
            },
            //上传图片成功接收客户端数据
            getResponse:[]
        }
    },
    methods:{
        //上传图片成功处理函数
        uploadSuccess(response, file, fileList) {
            Message({
                showClose: true,
                message: '图片上传成功',
                type: 'success'
            });
            this.getResponse = file.response
        },
        //上传图片失败处理函数
        uploadError(err,file,filelist){
            Message({
                showClose: true,
                message: '图片上传失败',
                type: 'error'
            });
        },
        //发布审核成功项目处理函数
        handlerRelease(){
            const formValue = this.formLabelAlign
            if(formValue.region === '' || formValue.name === '' || formValue.alias === '' || formValue.articleContent === ''){
                Message({
                    showClose: true,
                    message: '有空白项！',
                    type: 'error'
                });
                return
            }
            const region = this.formLabelAlign.region
            const name = this.formLabelAlign.name;
            const alias = this.formLabelAlign.alias;
            const articleContent = this.formLabelAlign.articleContent;
            const user_pic = this.getResponse.response.filepath
            ajax({url:'/my/projectSuccess/addProjectSuccess',
            data:{
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
                    Message({
                        showClose: true,
                        message: '上传项目成功',
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
                        message: '上传项目失败',
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
}
.el-form>.el-button{
    margin: 10px auto;
}
</style>