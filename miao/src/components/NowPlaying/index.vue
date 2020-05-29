<template>
<div>
    <headi  @sendiptVal="parentFn" />
    <div class="home-main">
        
        <Loading v-if="isLoading" />
        <Scroller v-else>
            <ul class="goods animated">
                <li v-for="item in goodsList" class="one-com"  v-show="isCurrent(item.kind)" >
                    <one-commodity
                    :itemId="item.id"
                    :imgUrl="item.img"
                    :title="item.title"
                    :content="item.content"
                    :price="item.price"
                    :number="item.number"
                    :selected="item.selected"
                    :count="0"
                    :imgUrls="item.imgs"
                    ></one-commodity>
                </li>
            </ul>
        </Scroller>
    </div>
</div>
</template>

<script>

import BScroll from 'better-scroll';
import OneCommodity from './List.vue'
import headi from "./Headi";

export default {
    name : 'NowPlaying',
    data(){
        var UA = navigator.userAgent;
        var ipad = !!(UA.match(/(iPad).*OS\s([\d_]+)/)),
        isIphone = !!(!ipad && UA.match(/(iPhone\sOS)\s([\d_]+)/)),
        isAndroid = !!(UA.match(/(Android)\s+([\d.]+)/)),
        isPC = !(isIphone || isAndroid || ipad);
        return{
            goodsList:[],
            dialogVisible: isPC,
            message:9,
            isLoading:true,
        }
    },
    components: {
        OneCommodity: OneCommodity,
        headi
    },
    computed: {
        animatedCurrentKey () {
            return this.$store.state.goods.GoodsCurrentSelKind;
        }
    },
    mounted () {
        
    },
    activated(){
        this.isLoading=true;
        this.axios.get('/api3/singer').then((res) => {
                var msg=res.data.msg;
                if(msg=='ok'){
                    this.isLoading=false;
                    this.goodsList =res.data.data.goods;
                    this.$nextTick(()=>{
                });
                }
            })
            .catch((err) =>{
                console.log(err);
            })
        /*
        var cityId=this.$store.state.city.id;
        if(this.prevCityId===cityId){
            return;
        }
        this.isLoading=true;
        this.axios.get('/api/movieOnInfoList?cityId='+cityId).then((res)=>{
           var msg=res.data.msg;
           if(msg=='ok'){
                this.movieList=res.data.data.movieList;
                this.isLoading=false;
                this.prevCityId=cityId;
                
                this.$nextTick(()=>{
                    var scroll=new BScroll(this.$refs.mb,{
                        tap:true,
                        probeType:1
                    });
                    
                    scroll.on('scroll',(pos)=>{
                        if(pos.y>30){
                            this.pullDownMsg='正在更新中...';
                        }
                    });
                    scroll.on('touchEnd',(pos)=>{
                        if(pos.y>30){
                            this.axios.get('/api/movieOnInfoList?cityId=10').then((res)=>{
                                var msg=res.data.msg;
                                if(msg=='ok'){
                                    this.pullDownMsg='更新完成';
                                    setTimeout(()=>{
                                        this.movieList=res.data.data.movieList;
                                        this.pullDownMsg='';
                                    },1000);
                                }
                            });
                        }
                    });
                    
                });
           }
        }).catch((error)=>{
            console.log(error);
        });*/
    },
    methods:{
        parentFn(payload) {
            this.message = payload;
        },
        //分类按钮点击时
        isCurrent (itemKind) {
            if (this.message=== 0||this.message=== 9) {
                //0表示全部商品
                return true;
            } else {
                return itemKind === this.message;
            }
        },
    }
}
</script>

<style lang="scss" scoped>
#content .movie_body{ flex:1; overflow:auto;}

.home-main{
  width: 100%;
  overflow-x: hidden;
  margin-top: 70px;
  margin-bottom: 50px;
}
.goods{
  width: 100%;
  list-style: none;
  padding: 0;
}
.goods>li{
  width: 100%;
}
.no-more-goods{
  height: 40px;
  line-height: 40px;
}
.slideInRight{
  animation-duration: 0.25s;
}
</style>
