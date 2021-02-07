<template>
    <div id="main">
        
            <!-- <div id="content">
                <div class="movie_menu">
                    <router-link tag="li" to="/movie/city" class="city_name">
                        <span>{{$store.state.city.nm}}</span><i class="iconfont icon-lower-triangle"></i>
                    </router-link>
					
                    <div class="hot_swtich">
                        <router-link tag="li" to="/movie/nowplaying" class="hot_item">正在热映</router-link>
                        <router-link tag="li" to="/movie/comingsoon" class="hot_item">即将上映</router-link>
                    </div>
                    <router-link tag="li" to="/movie/search" class="search_entry">
                        <i class="iconfont icon-sousuo"></i>
                    </router-link>
                </div> -->
        <Head title="喵喵电影" />
        <keep-alive>
            <!-- <router-link /> -->
            <router-view></router-view>
        </keep-alive>
        <Tab />
    </div>
</template>

<script>

import Head from '@/components/Header';
import Tab from '@/components/Tabbar';
import {messageBox} from '@/components/JS';

export default {
    name:'movie',
    components:{
        Head,
        Tab,
    },
    mounted(){
        // setTimeout(()=>{
            this.axios.get('/api/getLocation').then((res)=>{
                var msg=res.data.msg;
                if(msg==='ok'){
                    var nm=res.data.data.nm;
                    var id=res.data.data.id;
                    if(this.$store.state.city.id==id){return;}
                    messageBox({
                        title:'定位',
                        content:nm,
                        cancel:'取消',
                        ok:'切换定位',
                        handleCancel(){
                            // console.log('111');
                        },
                        handleOk(){
                            window.localStorage.setItem('nowNm',nm);
                            window.localStorage.setItem('nowId',id);
                            window.location.reload();
                        }
                    });
                }
            });
        // },3000);
    }
}
</script>

<style lang="scss" scoped>
$GobalFontSize: 14px;
$mainRed: #ff65af;

$NavHeight: 60px;

$HomeHeaderHeight: 85px;

$OneCommodityWrapHeight: 130px;
$OneCommodityWrapHeight600: 200px;
$OneCommodityWrapHeight800: 250px;
$OneCommodityWrapHeight1025: 300px;

$dpFooterHeight:50px;
$dpHeaderHeight:50px;

$cartHeaderHeight: 40px;
$cartFooterHeight: 40px;
.home-header{
    
  left: 0;
  top: 0;
  width: 100%;
  background-color: #fff;
  z-index: 999;
  .top-text{
    height: $HomeHeaderHeight - 40px;
    line-height: $HomeHeaderHeight - 40px;
  }
  .tap-menu{
  }
}
</style>
