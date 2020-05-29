<template>
	<div class="details-page">
		<div class="header dp-header">
			<span class="dp-header-toRoot">
				<router-link to="/">
					<i class="el-icon-arrow-left" ></i>
				</router-link>
			</span>
			<h3>商品详情</h3>
		</div>
		<div class="main dp-main">
			<div class="swiper-container">
				<div class="swiper-wrapper" >
					<div class="swiper-slide" v-for="item in 5">
						<img :src="goods.img">
					</div>
				</div>
				
			</div>
			<div class="goods-card">
				<h3>{{goods.title}}</h3>
				<p>{{goods.content}}</p>
				<div>
					<span>￥
						<span class="goods-price">{{goods.price}}</span>
					</span>
				</div>
			</div>
			<div class="goods-intruction">
				<p v-for="item in 30">
				这是111的商品详细介绍
				</p>
			</div>
		</div>
		<div class="footer dp-footer">
			<span>
				<router-link to="/Cart">
					<el-button icon="el-icon-goods">
						<span class="cart-counter" v-show="cartCounter > 0">{{ cartCounter }}</span>
					</el-button>
				</router-link>
			</span>
			<el-button @click="addGoodsToCart" type="danger">加入购物车</el-button>
		</div>
</div>
</template>

<script>

import Header from '@/components/Header';

export default {
    name: 'detail-page',
	data () {
		return {/* 
			swiperOption:{
                    //显示分页
                    pagination: {
                      el: '.swiper-pagination'
                    },
                    //设置点击箭头
                    navigation: {
                      nextEl: '.swiper-button-next', 
                      prevEl: '.swiper-button-prev'
                    },
                    //自动轮播
                    autoplay: {
                      delay: 2000,
                      //当用户滑动图片后继续自动轮播
                      disableOnInteraction: false,
                    },
                    //开启循环模式
                    loop: flase
                } */
		}
	},
	computed: {
		goods () {
			return this.$route.query;
		},
		cartCounter () {
			return this.$store.state.cartCounter;
		},
	},
	methods: {
		addGoodsToCart () {
			this.$store.commit('addGoodsToCart', this.goods);
		},
	},
	mounted(){
		new Swiper ('.swiper-container', {
			autoplay: {
				delay: 2000,
				//当用户滑动图片后继续自动轮播
				disableOnInteraction: false,
				autoplayStopOnLast : true,
			},
			loop: false,
			// 如果需要分页器
			pagination: '.swiper-pagination',
			// 如果需要前进后退按钮
			nextButton: '.swiper-button-next',
			prevButton: '.swiper-button-prev',
		})
		/* 
		this.$nextTick(()=>{
			new Swiper(this.$refs.detail_player , {
				slidesPerView : 'auto',
				freeMode : true,
				freeModeSticky: true
			});
		}); */
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

.details-page{
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1001;
  background-color: #fff;
  text-align: center;
}
.dp-header{
  position: fixed;
  text-align: center;
  height: $dpHeaderHeight;
  border-bottom: 1px solid #eee;
  line-height: $dpHeaderHeight;
  background-color: #fff;
  width: 100%;
  z-index: 2;
  .dp-header-toRoot{
    display: block;
    position: absolute;
    top: 0;
    left: 5px;
    .el-icon-arrow-left{
      font-size: 20px;
      font-weight: 800;
    }
  }
}
.dp-main{
  background-color: #fff;
  padding-bottom: $dpFooterHeight + 10px;
  padding-top: 50px;
  .goods-img-wrap{
	  width: 20px;text-align: center;
  }
  .goods-card{
    border: 1px solid #eee;
    margin: 0 10px;
    line-height: 40px;
    .goods-price{
      color: $mainRed;
    }
  }
  .goods-intruction{
    margin-top: 10px;
    border: 1px solid #eee;
    padding: 10px;
    line-height: 20px;
  }
}
.dp-footer{
  width: 100%;
  height: $dpFooterHeight;
  position: fixed;
  bottom: 0;
  left: 0;
  border-top: 1px solid #eee;
  background-color: #fff;
  font-size: 0;
  .el-button--default,
  .el-button--danger{
    border: none;
    border-radius: 0;
    height: 50px;
  }

  .el-button--default{
    position: relative;
    width: 20%;
  }
  .el-button--danger{
    width: 80%;
    background-color: $mainRed;
  }
  .cart-counter{
    position: absolute;
    z-index: 10;
    width: 25px;
    height: 20px;
    top: 5px;
    left: 35px;
    line-height: 20px;
    border-radius: 40%;
    background-color: #ff65af;
    color: #fff;
    font-size: 10px;
  }
}
.swiper-container {
        height: 300px;
        margin: 20px auto;
	}
.swiper-slide img{
	width:180px;
	margin: auto;
}
</style>
