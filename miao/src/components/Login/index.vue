
<template>
<div class="login_body">
    <div class="mainnn">
        <el-form label-width="60px">
            <el-form-item label="用户名">
                <el-input v-model="username" type="text" placeHolder="账户名/手机号/Email"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="password" type="password" placeHolder="请输入您的密码"></el-input>
            </el-form-item>
            <el-form-item label="验证码">
                <el-input type="text" placeHolder="请输入您的验证码" v-model="verifyImg"></el-input>
                <img @touchstart="handleToVerifyImg" src="/api2/users/verifyImg" alt="">
            </el-form-item>
        </el-form>
    </div>
    <div class="footer">
        <el-button type="danger" @click="handleToLogin">登录</el-button>
    </div>
    <div class="login_link">
        <router-link to="/mine/register" href="#">立即注册</router-link>
        <router-link to="/mine/findpassword" href="#">找回密码</router-link>
    </div>
</div> 
</template>

<script>
import {messageBox} from '@/components/JS';
export default {
    name:'login',
    data(){
        return{
            username:'',
            password:'',
            verifyImg:''
        }
    },
    methods:{
        handleToLogin(){
            this.axios.post('/api2/users/login',{
                username:this.username,
                password:this.password,
                verifyImg : this.verifyImg
            }).then((res)=>{
                var status=res.data.status;
                var This=this;
                if(status==0){
                    messageBox({
                        title:'登录',
                        content:'登录成功',
                        ok:'确定',
                        handleOk(){
                            This.$store.commit('login');
                            This.$router.push('/mine/center');
                        }
                    })
                }else{
                    
                    messageBox({
                        title:'登录',
                        content:res.data.msg,
                        ok:'确定'
                    })
                }

            });
        },
        handleToVerifyImg(ev){
            ev.target.src='/api2/users/verifyImg?'+Math.random();
        },
    }
}
</script>

<style lang="scss" scoped>

  .mainnn{
    background-color: #fff;
    margin-top: 10px;
    padding: 10px;text-align: center;
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

.login_link{ display: flex; justify-content:space-between;}
.login_link a{ text-decoration: none; margin:0 5px; font-size: 12px; color: #ff65af;}
</style>