<template>
    <footer id="footer">
        <ul>
            <router-link tag="li" to="/movie">
                <i class="iconfont icon-tab_home_nor"></i>
                <p>主页</p>
            </router-link>
            <router-link tag="li" to="/cinema"> 
                <i class="iconfont icon-tab_car_nor">
                    <span class="cart-counter" v-show="cartCounter > 0" >{{ cartCounter }}</span>
                </i>
                <p>购物车</p>
            </router-link>
            <router-link tag="li" to="/mine">
                <i class="iconfont icon-tab_my_nor">
                </i>
                <p>我的</p>
            </router-link>
        </ul>
	</footer>
</template>

<script>
// import { mapState } from "vuex";
export default {
    name:'tabbar',
    computed: {
        // ...mapState(["cartCounter"])
        cartCounter () {
            return this.$store.state.goods.cartCounter;
        },
    },
}
</script>

<style scoped>
    #footer{ width:100%; height:50px; background: white; border-top:2px #ebe8e3 solid; position: fixed; left: 0; bottom:0;}
    #footer ul{ display: flex; text-align: center; height:50px; align-items:center;}
    #footer ul li{ flex:1; height:40px;}
    #footer ul li.active{ color: #ff65af;}
    #footer ul li.router-link-active{ color: #ff65af;}
    #footer ul i{ font-size: 20px;}
    #footer ul p{ font-size: 12px; line-height: 18px;}
    .cart-counter{position: absolute;width: 25px;height: 20px;top: 5px;line-height: 20px;border-radius: 40%;background-color:red;color: #fff;font-size: 10px;
}
</style>