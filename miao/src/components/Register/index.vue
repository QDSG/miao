<template>
    <div class="register_body">
        <div class="mainnn">
            <el-form label-width="70px">
                <el-form-item label="邮箱">
                    <el-input  v-model="email" type="text" placeHolder="请输入你的邮箱"></el-input>
                    <el-button type="primary" :disabled="disabled" @click="handleToVerify">{{ verifyInfo }}</el-button>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input v-model="username" type="text" placeHolder="请输入您的用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input  v-model="password" type="password" placeHolder="请输入您的密码"></el-input>
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input   type="password" placeHolder="请确认您的密码"></el-input>
                </el-form-item>
                <el-form-item label="验证码">
                    <el-input  v-model="verify" type="text" placeHolder="请输入邮箱验证码" ></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div class="footer">
            <el-button type="danger" @click="handleToRegister">注册</el-button>
        </div>
        <div class="register_link">
            <router-link to="/mine/login">立即登录</router-link>
            <router-link to="/mine/findPassword">找回密码</router-link>
        </div>
    </div>
</template>

<script>
import {messageBox} from '@/components/JS';
export default {
    name:'register',
    data(){
        return{
            email:'',
            username:'',
            password:'',
            verify:'',
            verifyInfo:'发送验证码',
            disabled:false,
        }
    },
    methods:{
        handleToVerify(){

            if(this.disabled){return;}

            this.axios.get('/api2/users/verify?email='+this.email).then((res)=>{
                var status=res.data.status;
                var This=this;
                if(status==0){
                    messageBox({
                        title:'验证码',
                        content:'验证码已发送',
                        ok:'确定',
                        handleOk(){
                            This.countDown();
                        }
                    });
                }else{
                    messageBox({
                        title:'验证码',
                        content:'验证码发送失败',
                        ok:'确定'
                    });
                }
            });
        },
        handleToRegister(){
            this.axios.post('/api2/users/register',{
                email:this.email,
                username:this.username,
                password:this.password,
                verify:this.verify,
            }).then((res)=>{
                var status=res.data.status;
                var This=this;
                console.log(status);
                if(status==0){
                    messageBox({
                        title:'注册',
                        content:'用户注册成功',
                        ok:'确定',
                        handleOk(){
                            This.$router.push('/mine/login');
                        },
                    });
                }else{
                    messageBox({
                        title:'注册',
                        content:res.data.msg+',请重新注册',
                        ok:'确定',
                    });
                }
            })
        },
        countDown(){
            this.disabled=true;
            var count=60;
            var timer=setInterval(()=>{
                count--;
                this.verifyInfo='剩余'+count+'秒';
                if(count===0){
                    this.disabled=false;
                    count=60;
                    this.verifyInfo='发送验证码';
                    clearInterval(timer);
                }
            },1000);
            console.log(timer);
        },
    }
}
</script>

<style lang="scss" scoped>
.register_body .register_link{ display: flex; justify-content:space-between;}
.register_body .register_link a{ text-decoration: none; margin:0 5px; font-size: 12px; color:#ff65af;}
.mainnn{
    background-color: #fff;
    margin-top: 10px;
    padding: 10px;text-align: center;
   
    .el-button{
        font-size: 12px;
        float: right;
        margin-top: 2px;
    }
  }
  .footer{
    margin: 10px;
    margin-bottom: 20px;
    text-align: center;
    .el-button--danger{
		width: 80%;
		background-color: #ff65af;
		}
  }
</style>