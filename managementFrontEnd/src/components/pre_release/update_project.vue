<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/release_list'}">项目发布管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/release_list'}">项目列表</el-breadcrumb-item>
            <el-breadcrumb-item>编辑项目信息</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" style="margin:0 auto">
                <el-form-item label="项目名称">
                    <el-input v-model="formLabelAlign.name"></el-input>
                </el-form-item>
                <el-form-item label="项目描述">
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
                <el-form-item label="项目图片">
                    <el-upload
                        class="upload-demo"
                        :action="https"
                        list-type="picture"
                        :on-success="uploadSuccess"
                        :headers = "headerObj"
                        :file-list="fileList"
                        >
                        <el-button size="small" type="primary" round >图片上传</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="项目内容">
                    <quill-editor v-model="formLabelAlign.articleContent"></quill-editor>
                </el-form-item>
                <el-button type="primary" @click="handlerRelease('/my/artCateRouter/update_artcate',1)">修改项目</el-button>
                <el-button type="primary" @click="handlerRelease('/my/projectVote/addProjectVote',0)" style="margin-left:30px">发布到审核列表</el-button>
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
            //发送ajax请求的路径
            https:Url+'/my/image/add_file',
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
    methods:{
        //获取需要修改项目的信息
        getUpdateData(){
            //获取列表传递的参数（项目id）
            const id = this.$route.query.id
            ajax({url:'/my/artCateRouter/cates_id',
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
        //上传成功回调
        uploadSuccess(response, file, fileList) {
            Message({
                showClose: true,
                message: '图片上传成功',
                type: 'success'
            });
            this.getResponse = file.response
        },
        //修改/审核项目上传功能
        handlerRelease(url,index){
            //获取列表传递的参数（项目id）
            const id = this.$route.query.id
            //获取项目名
            const name = this.formLabelAlign.name
            //获取项目类型
            const region = this.formLabelAlign.region
            //获取项目描述
            const alias = this.formLabelAlign.alias
            //获取项目内容
            const articleContent = this.formLabelAlign.articleContent
            //判断图片是否修改，项目图片修改则存储修改后路径，否则存储原始路径
            if (this.getResponse.length !== 0) {
                //获取项目图片
                const user_pic = this.getResponse.response.filepath
                this.sendAjax(id,name,alias,articleContent,user_pic,region,url,index)
            }else{
                const user_pic = this.fileList[0].url.replace(Url,'')
                this.sendAjax(id,name,alias,articleContent,user_pic,region,url,index)
            }
        },
        //修改/审核上传项目方法  
        sendAjax(id,name,alias,articleContent,user_pic,region,url,index){
            ajax({url:url,
            data:{
                name,
                alias,
                articleContent,
                user_pic,
                region,
                id
            },
            header:{"Content-Type": "application/x-www-form-urlencoded"},
            method:"post"
            }).then(results => {
                console.log(results)
                if(results.status === 0){
                    if (index === 1) {
                        Message({
                            showClose: true,
                            message: '修改项目成功！',
                            type: 'success'
                        });
                    }else{
                        Message({
                            showClose: true,
                            message: '项目发布到审核列表成功！',
                            type: 'success',
                            duration:'1000',
                            onClose:()=>{
                                this.$router.push({
                                    path:'/examine_list',
                                })
                            }
                        });
                    }
                }else{
                    if (index === 1) {
                        Message({
                            showClose: true,
                            message: '修改项目失败！',
                            type: 'error'
                        });
                    }else{
                        console.log(results)
                        Message({
                            showClose: true,
                            message: '项目发布到审核列表失败！',
                            type: 'error'
                        });
                    }
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