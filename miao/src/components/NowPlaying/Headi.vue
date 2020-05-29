<template>
        <header>
            <div class="tap-menu">
                <el-tabs :tab-position="'top'" type="border-card" style="height: 39px;" v-model="goodsType" @tab-click="changeGoodsType">
                    <el-tab-pane label="全部" name="全部"></el-tab-pane>
                    <el-tab-pane label="鞋靴" name="鞋靴"></el-tab-pane>
                    <el-tab-pane label="食品" name="食品"></el-tab-pane>
                    <el-tab-pane label="生鲜" name="生鲜"></el-tab-pane>
                    <el-tab-pane label="箱包" name="箱包"></el-tab-pane>
                    <el-tab-pane label="饰品" name="饰品"></el-tab-pane>
                    <el-tab-pane label="数码" name="数码"></el-tab-pane>
                    <el-tab-pane label="洗护" name="洗护"></el-tab-pane>
                </el-tabs>
            </div>
        </header>
        
</template>

<script>


export default {
    data(){
        return{
            kindToType: new Map([
                ['全部', 0],
                ['鞋靴', 1],
                ['食品', 2],
                ['生鲜', 3],
                ['箱包', 4],
                ['饰品', 5],
                ['数码', 6],
                ['洗护', 7]
            ]),
            goodsType: '全部',
            aaaa:0
        }
    },
    methods:{
        changeGoodsType () {
            this.aaa = this.kindToType.get(this.goodsType);
            // this.$store.commit('chang',this.a)
            this.$emit("sendiptVal", this.aaa) 
        },
    },
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