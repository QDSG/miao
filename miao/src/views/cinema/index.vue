<template>
    <div >
        <Head title="我的购物车" style=" position:fixed; z-index:2;"/>
			
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
// import CL from '@/components/CiList';

export default {
    name:'cinema',
    components:{
        Head,
        Tab,
        // CL,
    },
}
</script>

<style>
#content .cinema_menu{ width: 100%; height: 45px; border-bottom:1px solid #e6e6e6; display: flex; justify-content:space-around; align-items:center; background:white;}

</style>