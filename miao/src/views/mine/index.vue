<template>
    <div id="main">
        <Head style="position: relative;" title="个人中心" />
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
export default {
    name:'mine',
    components:{
        Head,
        Tab,
    },
}
</script>

<style>
</style>