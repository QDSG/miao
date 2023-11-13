<template>
    <div>
        <div>个人中心: </div>
        <div>当前用户:{{$store.state.user.name}}<a @click="handleToLogout">退出</a></div>
        <div v-if="$store.state.user.isAdmin">用户身份:管理员 <router-link tag="a" to="/admin">进入管理员后台</router-link></div>
        <div v-else>用户身份:普通会员</div>
        <div>
            <input type="file" name="file" value="上传头像" @change="handleToUpload">
            <img class="userHead" :src="$store.state.user.userHead" alt="">
        </div>
        <div>定位：<a style="color:#ff65af"  @click="goToDetailsPage">{{$store.state.city.nm}}</a>（点击可更改）
        </div>
        <!-- <div>我的订单</div> -->
        <div >
              <el-button @click.stop="toEditAddressPage">我的地址<i class="el-icon-arrow-right"></i></el-button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { messageBox } from '@/components/JS';
export default {
    name:'center',
    methods:{
        handleToLogout(){
            this.axios.get('/api2/users/logout').then((res)=>{
                var status=res.data.status;
                if(status==0){
                    localStorage.removeItem('name');
                    localStorage.removeItem('isAdmin');
                    this.$store.commit('user/USER_NAME',{name:'',isAdmin:false,userHead:''});
                    this.$store.commit('login');
                    this.$router.push('/mine/login');
                }
            });
        },
        goToDetailsPage () {
            this.$router.push({
                path: '/mine/city',
            });
        }, 
        toEditAddressPage () {
            this.$router.push({
                path: '/mine/address'
            })
        },
        handleToUpload(ev){
            var file = ev.target.files[0];
            var param = new FormData();
            param.append('file' , file , file.name);
            var config = {  headers : {'Content-Type' : 'multipart/form-data'} };
            this.axios.post('/api2/users/uploadUserHead',param , config).then((res)=>{
                var status = res.data.status;
                var This = this;
                if( status === 0 ){
                    messageBox({
                        title : '信息',
                        content : '上传头像成功',
                        ok : '确定',
                        handleOk(){
                            This.$store.commit('user/USER_NAME',{ 
                                // name : This.$store.state.user.name , 
                                // isAdmin : This.$store.state.user.isAdmin ,
                                userHead : res.data.data.userHead,
                                // + '?' + Math.random()
                            });
                        }
                    });
                }
                else{
                    messageBox({
                        title : '信息',
                        content : '上传头像失败',
                        ok : '确定'
                    });
                }
            });

        }
    },
    beforeRouteEnter (to, from, next) {
        // 在渲染该组件的对应路由被 confirm 前调用
        // 不！能！获取组件实例 `this`
        // 因为当守卫执行前，组件实例还没被创建
        axios.get('/api2/users/getUser').then((res)=>{
            var status=res.data.status;
            if(status===0){
                next(vm=>{
                    localStorage.setItem('name',res.data.data.username);
                    localStorage.setItem('isAdmin',res.data.data.isAdmin);
                    vm.$store.commit('user/USER_NAME',{
                        name:res.data.data.username,
                        isAdmin:res.data.data.isAdmin,
                        userHead:res.data.data.userHead
                    });
                });
            }else{
                next('/mine/login');
            }
        });
    },
  }
</script>

<style scoped>
.userHead{ width:100px; height:100px; border-radius: 50%; overflow: hidden;}
a {color: -webkit-link; cursor: pointer; text-decoration: underline;}
</style>