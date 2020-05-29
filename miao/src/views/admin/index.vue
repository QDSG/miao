<template>
    <div>
        <el-container>
            <el-header>喵喵网后台，欢迎:{{$store.state.user.name}}</el-header>
            <el-container>
                <el-aside width="200px">
                    <el-menu default-active="1"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose">
                        <el-menu-item index="1">
                            <i class="el-icon-menu"></i>
                            <router-link tag="span" to="/admin/mine" slot="title">用户管理</router-link>
                        </el-menu-item>
                        <el-menu-item index="2">
                            <i class="el-icon-document"></i>
                            <router-link tag="span" to="/admin/movie" slot="title">订单管理</router-link>
                        </el-menu-item>
                        <el-menu-item index="3">
                            <i class="el-icon-setting"></i>
                            <router-link tag="span" to="/admin/cinema" slot="title">商品管理</router-link>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main>
                    <router-view />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name:'admin',
    beforeRouteEnter (to, from, next) {
        // 在渲染该组件的对应路由被 confirm 前调用
        // 不！能！获取组件实例 `this`
        // 因为当守卫执行前，组件实例还没被创建
        axios.get('/api2/admin').then((res)=>{
            var status=res.data.status;
            if(status===0){
                next();
            }else{
                next('/mine/login');
            }
        });
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    },
}
</script>

<style scoped>
 .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }
</style>