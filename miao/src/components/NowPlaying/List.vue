<template>

    <div class="movie_body" >
        <ul>
            <li >
                <div class="pic_show"><img :src="imgUrl |setWH('128.180')" @click="goToDetailsPage"></div>
                <div class="info_list">
                    <h3 class="title" @click="goToDetailsPage">{{ title }}</h3>
                    <p class="content">{{ content }}</p>
                    <div>
                        <span class="price"> ￥
                            <span class="price-number">{{ price }}</span>
                        </span>
                    </div>
                </div>
                <div class="btn_pre">
                    <el-button icon="el-icon-goods" type="danger" circle
                        @click="addGoodsToCart()" v-show="panduan"> </el-button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>

export default {
    name: 'one-commodity',
    props: ['itemId','imgUrl', 'title', 'content', 'price', 'count','number','selected','imgUrls'],
    data () {
        return {
            loadingImg: true,
            oneCommodity: {

                id: this.itemId,
                img: this.imgUrl,
                title: this.title,
                content: this.content,
                price: this.price,
                count: this.count,
                number:this.number,
                selected:this.selected,
                isInCart: false,
                imgs:this.imgUrls,
            },
            aaa:0
        }
    },
    
    methods: {
        addGoodsToCart () {
            console.log(this.$store.state.goods.Counters[this.oneCommodity.id]);
            this.$store.commit('addGoodsToCart',this.oneCommodity);
            this.aaa++;
        },
        goToDetailsPage () {
            this.$router.push({
                path: '/movie/detail',
                query: this.oneCommodity
            });
        }, 
    }, 
    computed: {
        Counters () {
            return this.$store.state.goods.Counters[this.oneCommodity.id];
        },
        panduan(){
            if(this.aaa==0||this.Counters==0){
                return true;
            }
            return false;
        }
    },
    created () {
        let img = new Image();
        img.src = this.imgUrl;
        img.onload = () => {
            this.loadingImg = false;
        }
    }

}

</script>

<style scoped>
#content .movie_body{ flex:1; overflow:auto;}
.movie_body ul{ margin:0 12px; overflow: hidden;}
.movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
.movie_body .pic_show{ width:64px; height: 90px;}
.movie_body .pic_show img{ width:100%;}
.movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
.movie_body .info_list h2{ font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list .price .price-number{color: #ff65af;font-size: 18px;font-weight: 600;}
/* .movie_body .btn_pre{position: absolute;bottom: 5px;right: 10px;} */
.movie_body .btn_pre .el-button--danger{background-color: #ff65af;border-color: #ff65af;}
</style>