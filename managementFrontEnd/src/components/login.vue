<template>
    <div class="login_container">
        <div class="login_box">
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="">
            </div>
            <!-- 表单区域 -->
            <el-form ref="loginFormRef" :model="loginForm" label-width="0" class="login_form" :rules="loginFormRules">
                <!-- 用户名 -->
                <el-form-item prop="username">
                    <el-input 
                    v-model="loginForm.username"
                    prefix-icon="el-icon-user"
                    ></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" type="password" show-password></el-input>
                </el-form-item>
                <!-- 按钮 -->
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="info" @click="resetLoginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { Message } from 'element-ui'
import { ajax } from '../api/router'
export default {
    data(){
        return{
            //登录表单数据
            loginForm:{
                username:'',
                password:''
            },
            //表单验证规则
            loginFormRules:{
                username: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        //重置处理方法
        resetLoginForm(){
            // console.log(this);
            this.$refs.loginFormRef.resetFields();
        },
        //登录处理方法
        login(){
            this.$refs.loginFormRef.validate( valid=>{
                if(!valid) return;
                ajax({
                url:'/api/admin_login',
                data:this.loginForm,
                header:{"Content-Type": "application/x-www-form-urlencoded"},
                method:'post'}).then(res=>{
                    if(res.status === 0){
                        Message({
                            showClose: true,
                            message: '登录成功',
                            type: 'success'
                        });
                        sessionStorage.setItem("token",res.token)
                        this.$router.push('/home')
                    }else{
                        Message({
                            showClose: true,
                            message: '账号或密码错误',
                            type: 'error'
                        });
                    }
                })
            })
        }
    }
}
</script>
<style lang="less" scoped>
.login_container{
    width: 100%;
    background-image: url("../../public/login.jpg");
    background-size: 100% auto;
    height: 100%;
}
.login_box{
    width: 450px;
    height: 300px;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    .avatar_box{
        height: 130px;
        width: 130px;
        border: 1px solid #eee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        left: 50%;
        transform: translate(-50%,-50%);
        background-color: rgba(255, 255, 255, 0.8);;
        img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #eee;
        }
    }
}
.login_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}
.btns{
    display: flex;
    justify-content: flex-end;
}
</style>