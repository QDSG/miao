
<template>
    <div id="views">
        <section class="cart ui-form" >
            <div class="cart-panel">
                <!--购物车如果没有数据则显示-->
                <div class="ui-empty" v-if="cartGoods.length ==''">
                    <p class="ui-empty-icon"><i class="icon icon-uniE810"></i></p>
                    <p class="ui-empty-text">购物车还是空的哦～</p>
                </div>
                <div v-else>
                <div class="ui-panel"  v-for="item in cartGoods">
                    <h3 class="ui-panel-hd" >
                        <input type="checkbox" class="ui-checkbox c-shop" v-model="item.selected" @click="selecteItem(item)">
                        <label>1111111</label>
                    </h3>
                    <div class="ui-panel-bd">
                        <ul class="ui-list cart-goods">
                            <li class="ui-list-item"  >
                                <a class="cart-goods-pic">
                                    <img class="fadeIn" :src="item.img">
                                </a>
                                <div class="cart-goods-des">
                                    <input type="checkbox" class="ui-checkbox c-shop" v-model="item.selected"  @click="selecteItem(item)">
                                    <h5 class="cart-goods-name">{{item.title}}</h5>
                                    <p class="cart-goods-sku">  颜色：黑色；  尺码：L；  </p>
                                    <p class="cart-goods-price">
                                        <span class="price-origin">4128</span>
                                        <br>
                                        <span class="price">{{item.price}}</span>
                                    </p>
                                    <div class="cart-goods-counter">
                                        <a class="btn-sub" @click="calcitemNum(-1, item)">
                                            <i class="icon icon-uniE808"></i>
                                        </a>
                                        <input type="text" class="cart-goods-num" v-model="item.number"  />
                                        <a href="javascript:;" class="btn-add " @click="calcitemNum(1, item)"><i class="icon icon-uniE807"></i></a>

                                    </div>
                                </div>
                                <div style="height: 20px;">
                                    <a class="cart-goods-dustbin"  @click="delGoodEvent(item)">
                                        <i class="icon icon-uniE803"></i>
                                    </a>
                                </div>
                                <!-- <div v-for="item in cartGoods">{{item.title}}</div> -->
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="price-wrap">
            <div class="amount">商品总价：
              <span class="float-right">￥{{ totalPrice }}</span>
            </div>
            <div class="red-packet">
              <div>红包：
                <el-select v-model="redPacket" :placeholder="redPacketPlaceholder">
                  <el-option
                    v-for="item in redPackets"
                    :key="item.id"
                    :label="item.label"
                    :value="item.money"
                    :disabled="isRedPacketDisabled(item.limit)">
                  </el-option>
                </el-select>
                <span class="float-right" v-show="redPacket">-￥{{ redPacket }}</span>
              </div>
            </div>
            <div class="pay">
              <div>商品实付：
                <span class="float-right">￥{{ totalPrice - redPacket  }}</span>
              </div>
              <div>
                <span>运费（实付满49免邮）：</span>
                <span class="float-right">
                  <span class="postage" v-show="needPostage">￥{{ postage }}</span>
                  <span class="postage" v-show="!needPostage">免邮</span>
                </span>
              </div>
              <div>
                <span class="text-left">合计：
                  <span class="float-right">￥{{ pay }}</span>
                </span>
              </div>
            </div>
          </div>
                </div>
            </div>
        </section>
        <div class="cart-checkout" v-if="cartGoods.length !=''">
            <div class="cart-checkbox">
                <input type="checkbox" name="c-all" class="ui-checkbox c-all" v-model="selecteAllState" @click="selecteAll">
                <label for="c-all">全选</label>
            </div>
            <div class="cart-counter">
                <p class="total-price">
                总计 :
                <em class="sum">￥{{totalPrice}}</em>
                </p>
                <p class="total-save" v-show="redPacket!=''">为您节省<span class="save">￥{{redPacket}}</span></p>
            </div>
                <el-button type="danger" class="text-right" @click="setEvent">去结算<i class="el-icon-arrow-right el-icon--right"></i></el-button>
            </div>
        </div>
    </div>
</template>

<script>
// import { mapState } from "vuex";
import {messageBox} from '@/components/JS';
export default {
    data () {
        return {
            selecteAllState: false,
            // cartGoods:[],
            total:{
                price:0,
                nowprice:0
            },
            checklength:0,
            checkitem:[],
            redPackets: [
                {id: 1, money: 10, limit: 70, label: '10元红包(满70可用)'},
                {id: 2, money: 20, limit: 100, label: '20元红包(满100可用)'},
                {id: 3, money: 30, limit: 150, label: '30元红包(满150可用)'}
            ],
            redPacket: '',
            redPacketPlaceholder: '无可用红包',
            postage: 6,
            needPostage: true
        }
	},
    computed: {
        cartGoods () {
            return this.$store.state.goods.cartGoods;
        },
        totalPrice () {
            let price = 0
            this.cartGoods.forEach(item => {
                if (item.selected) {
                    price += item.number * item.price
                }
            })
            return price
        },
        pay () {
            let result = this.totalPrice - this.redPacket;
            if (result >= 49) {
                this.needPostage = false;
            } else {
                this.needPostage = true;
            }
            if (this.needPostage) {
                result += this.postage;
            }
            return result;
        },
    },
    methods: {
        isRedPacketDisabled (limit) {
            //某个红包是否可选
            if (this.totalPrice < limit) {
                //没有可用红包时
                if (this.totalPrice < this.redPackets[0].limit) {
                this.redPacket = '';
                this.redPacketPlaceholder = '无可用红包';
                }
                return true;
            } else {
                //有红包可用时，默认选择最大优惠
                this.redPackets.concat().reverse().some(val => {
                if (val.limit <= this.totalPrice) {
                    this.redPacket = val.money;
                    return true;
                }
                })
                return false;
            }
        },
        selecteItem (item) {
            item.selected = !item.selected;
            if(item.selected){
                this.checklength++;
                if(this.checklength==this.cartGoods.length){
                    this.selecteAllState = true;
                }
            }else if(!item.selected){
                this.checklength--;
                 if(this.checklength<this.cartGoods.length){
                    this.selecteAllState = false;
                }
            }
        },
        selecteAll () {
            this.selecteAllState = !this.selecteAllState
            
            this.cartGoods.forEach(item => {
                item.selected = this.selecteAllState
            });
            if(this.selecteAllState){
                this.checklength==this.cartGoods.length;
            }else{
                this.checklength==0;
            }
        },
        calcitemNum (step, obj) {
            //item.number += Math.floor(step)
            if(step == -1){
                if(obj.number > 1){
                    obj.number = parseInt(obj.number) - 1;
                }
            }else{
                    obj.number = parseInt(obj.number) + 1;
            }
        },
       
        //删除商品
        delGoodEvent (item) {
            // this.$store.commit('deleteGoodsFromCart',item.id)
             var _this=this;
            messageBox({
                title:'删除',
                content:'确定要删除这个商品吗',
                cancel:'取消',
                ok:'确定',
                handleCancel(){
                    // console.log('111');
                },
                handleOk(){
                    _this.$store.commit('deleteGoodsFromCart',item.id)
                }
            }); 
        },
        //结算按钮
        setEvent(){
            var islog=this.$store.state.goods.isLogin;
            console.log(islog);
            if(!islog){
                var This=this;
                messageBox({
                    title:'提示',
                    content:'您还未登录，请先登录',
                    cancel:'取消',
                    ok:'确定',
                    handleCancel(){
                        // console.log('111');
                    },
                    handleOk(){
                        This.$router.push('/mine');
                    }
                }); 
            }else{
                
            }
        }
	},
}
</script>

<style scoped>
html {
background-color: #fff;
}
#views{
    padding-top: 30px;
}
.cart-panel {
	padding-bottom: 20px
}
.cart-panel {
	min-height: 50px;
}

.cart-panel .ui-panel {
	margin: 15px 0;
	border: none;
	border-top: 1px solid #d8d8d8;
	border-bottom: 1px solid #d8d8d8
}

.cart-panel .ui-panel-hd {
	padding: 8px 15px;
	border: none;
	font-weight: 400
}
.ui-list{
	list-style: none;
}
.cart-panel .ui-panel-hd .ui-checkbox {
	margin-right: 5px
}

.price-wrap{
      margin-top: 10px;
      background-color: #fff;
      padding: 15px 10px;
      text-align: left;
      line-height: 40px;
}
.price-wrap div{
        border-bottom: 1px solid #eee;
      }
      .red-packet .float-right{
        color: #f54c71;
      }

.cart-panel .ui-panel-hd label {
	vertical-align: middle;
	font-size: 14px
}
.ui-panel .ui-panel-hd {
	padding: 5px 10px;
	border-bottom: 1px solid #f0f0f0;
	background: #f6f5f5
}
.ui-form .ui-checkbox,.ui-form .ui-radio {
	width: 20px;
	height: 20px;
	border-width: 0;
	background: url(http://s10.mogucdn.com/img/x6/img/checkbox.png) 0 100% no-repeat;
	background-size: 20px auto
}

.ui-form .ui-checkbox:checked,.ui-form .ui-radio:checked {
	background-position: 0 0
}

.ui-form .ui-checkbox+span,.ui-form .ui-radio+span {
	margin-right: 10px;
	vertical-align: middle
}
.cart-panel .ui-panel-hd .ui-checkbox {
	margin-right: 5px
}

.ui-form .ui-checkbox {
	background: url(http://s10.mogucdn.com/img/x6/img/checkbox.png) 0 100% no-repeat;
	background-size: 20px auto
}
.cart-goods .ui-checkbox {
	left: 5px;
	background: url(http://s10.mogucdn.com/img/x6/img/checkbox.png) 0 100% no-repeat;
	background-size: 20px auto
}
.ui-list-item{
	margin: 20px;
	margin-left: 40px;
}
.cart-goods .ui-list-item.disabled .cart-goods-pic {
	position: relative
}

.cart-goods .ui-list-item.disabled .cart-goods-pic img {
	opacity: .6
}

.cart-goods .ui-list-item .cart-goods-pic .lock-info {
	position: absolute;
	bottom: 0;
	left: 2px
}

.cart-goods .ui-list-item .cart-goods-pic .lock-info img {
	height: 16px
}

.cart-goods .ui-list-item.disabled .cart-goods-pic .lock-info {
	position: absolute;
	left: 2px;
	bottom: 2px;
	content: '';
	display: block;
	width: 56px;
	height: 18px;
	line-height: 18px;
	text-align: center;
	font-size: 12px;
	color: #fff;
	background: rgba(252,167,34,.9)
}

.cart-goods-pic {
	float: left;
	width: 62px;
	height: 62px;
	padding: 2px;
	border: 1px solid #e2e2e2;
	position: relative
}

.cart-goods-pic img {
	width: 56px;
	height: 56px
}
.cart-goods-des {
	margin-left: 70px;
	width: 70%;
	min-height: 65px
}
.cart-goods-name {
	margin-top: -3px;
	height: 17px
}

.cart-goods-name,.cart-goods-sku {
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden
}
.cart-goods-sku {
	height: 20px;
	color: #999;
	font-size: 10px
}
.cart-goods .ui-list-item.disabled .cart-goods-counter .icon-sub {
	background-position: 0 -25px
}

.cart-goods .ui-list-item.disabled .cart-goods-counter .icon-add {
	background-position: 0 -39px
}

.cart-goods-counter {
	height: 25px;
	margin-top: 3px;
	-webkit-border-radius: 2px;
	border-radius: 2px
}

.cart-goods-counter .btn-add,.cart-goods-counter .btn-sub,.cart-goods-counter .cart-goods-num {
	display: inline-block;
	width: 10%;
	height: 24px;
	line-height: 20px;
	border: 1px solid #dad7d7;
	text-align: center;
	vertical-align: top
}

.cart-goods-counter .icon {
	font-size: 16px;
	color: #f54c71
}

.cart-goods-counter .disabled .icon {
	color: #dad7d7
}

.cart-goods-counter .cart-goods-num {
	width: 20%;
	line-height: 24px;
	border-left: 1px solid #dad7d7;
	border-right: 1px solid #dad7d7;
	color: #424242;
	font-size: 14px
}
@font-face {
	font-family: mogu icons;
	src: url(../../assets/font/iconfont.eot);
	src: url(../../assets/font/iconfont.eot) format('embedded-opentype'),
	url(../../assets/font/iconfont.woff) format('woff'),
	url(../../assets/font/iconfont.ttf) format('truetype'),
	url(../../assets/font/iconfont.svg#iconfont) format('svg')
}
[class*=" icon-uni"],[class^=icon-uni] {
	font-family: mogu icons;
	font-style: normal;
	font-weight: 400
}

[class*=" icon-"]:before,[class^=icon-]:before {
	display: inline-block
}
.icon-uniE808:before {
	content: '\e808'
}
.cart-goods .ui-list-item.disabled .cart-goods-num {
	color: #999
}
.cart-goods-price .price-origin {
	font-size: 12px;
	text-decoration: line-through;
	color: #999
}

.cart-goods-price {
	position: absolute;
	float:right;
	padding-right: 60px;
	right: 25px;
	text-align: right;
	line-height: 16px
}
.cart-goods-dustbin {
	display: block;
	width: 30px;
	height: 30px;
	right: 0;
	float: right;
	text-align: center;
	font-size: 20px;
	color: #a7a7a7
}

.icon-uniE803:before {
	content: '\e803'
}
.icon-uniE807:before {
content: '\e807'
}
.ui-form .ui-checkbox,.ui-form .ui-radio {
	width: 20px;
	height: 20px;
	border-width: 0;
	background: url(http://s10.mogucdn.com/img/x6/img/checkbox.png) 0 100% no-repeat;
	background-size: 20px auto
}

.ui-form .ui-checkbox:checked,.ui-form .ui-radio:checked {
	background-position: 0 0
}

.ui-form .ui-checkbox+span,.ui-form .ui-radio+span {
	margin-right: 10px;
	vertical-align: middle
}
.cart-panel .ui-panel-hd .ui-checkbox {
	margin-right: 5px;

}
.ui-form .ui-checkbox {
	background: url(http://s10.mogucdn.com/img/x6/img/checkbox.png) 0 100% no-repeat;
	background-size: 20px auto
}
.cart-goods .ui-checkbox {
	position: absolute;
	left: 18px;
	background: url(http://s10.mogucdn.com/img/x6/img/checkbox.png) 0 100% no-repeat;
	background-size: 20px auto
}

.cart-checkout {
  position: fixed;
  width: 100%;
  padding: 10px 15px;
  border-top: 1px solid #d8d8d8;
  background: #fefefe
}
.cart-checkout .cart-checkbox {
  display: inline-block;
  width: 28%;
  line-height: 31px;
  vertical-align: top
}

.cart-checkout .cart-checkbox label {
  margin-left: 5px;
  vertical-align: middle;
  font-size: 16px
}

.cart-checkout .cart-counter {
  display: inline-block;
  line-height: 18px
}

.cart-checkout .total-price {
  color: #ee4566
}

.cart-checkout .total-save {
  color: #999;
  font-size: 12px
}

.cart-checkout .ui-btn {
  position: absolute;
  right: 15px;
  padding: 6px 20px
}
.el-button--danger{
  background-color: #ee4566;
  border: none;
  border-radius: 0;
  position: fixed;
  right: 0;
}
</style>