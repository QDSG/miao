<template>
    <header id="header">
        <slot></slot>
        <h1>{{title}}</h1>
	</header>
</template>

<script>
export default {
    name:'Header',
    props:{
        title:{
            type:String,
            default:'喵喵影院',
        }
        
    }
        

}
</script>

<style scoped>
    #header{width:100%; height:30px; background-color: #fff; color: #909399; border-bottom: 1px solid #fff; position: relative; }
    #header h1{ font-size: 18px; text-align: center; line-height: 28px; font-weight: normal; }
    #header i{ position: absolute; left: 5px; top: 50%; margin-top: -13px; font-size: 26px;}
</style>