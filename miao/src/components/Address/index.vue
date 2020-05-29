<template>
    <div class="edit-address-page">
		<div class="header">
			<span class="toProfile" @touchstart="handleToBack">
				<i class="el-icon-arrow-left" ></i>
			</span>
			<h3>我的收货地址</h3>
		</div>
		<div class="main">
			<ul class="all-address"  v-if="allAddress.length > 0" v-for="i in 30">
			<li class="address" v-for="(item, index) in allAddress" >
				<p>{{ item.name }}</p>
				<p>{{ item.phone }}</p>
				<p>{{ item.city + item.detailAdd }}</p>
				<el-button type="text" @click="toModifyAddress(index)">编辑</el-button>
			</li>
			</ul>
		</div>
		<div class="footer">
			<el-button type="danger" @click="toAdressInputForm">
			新增收货地址
			</el-button>
		</div>
	</div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  computed: {
    allAddress () {
      return this.$store.state.goods.address;
    }
  },
  methods: {
	handleToBack(){
		this.$router.push({
        	path: '/mine'
      });
	},
    toProfile () {
      this.$router.push({
        path: '/mine/address'
      })
    },
    toAdressInputForm () {
      this.$router.push({
        path: '/mine/addaddress'
      })
    },
    toModifyAddress (index) {
      this.$router.push({
        path: '/mine/moaddress',
        query: {
          index: index
        }
      })
    }
  }

}
</script>

<style lang="scss" scoped>

	.edit-address-page{
	width: 100%;
	position: absolute;
	z-index: 1001;
	background-color: #f5f5f5;
	.header{
		position: fixed;
		width: 100%;
		height: 50px;
		text-align: center;
		border-bottom: 1px solid #eee;
		line-height: 50px;
		background-color: #fff;
		z-index: 2;
		.toProfile i{
		position: absolute;
		left: 10px;
		font-size: 20px;
		top: 50%;
		transform: translateY(-50%);
		}
	}
	.main{
		margin-top: 50px;
		margin-bottom: 60px;
		text-align: left;
		line-height: 23px;
		.all-address{
		background-color: #fff;
		::before{height: 0;}
		.address{
			position: relative;
			padding: 10px;
			border-top: 1px solid #eee;
			.el-button{
			position: absolute;
			right: 10px;
			top: 50%;
			transform: translateY(-50%);
			}
		}
		}
	}
	.footer{
		position: fixed;
		bottom: 0px;
		width: 100%;
		background-color: #fff;
		padding-top: 10px;
		padding-bottom: 10px;
		text-align: center;
		border-top: 1px solid #eee;
		.el-button--danger{
		width: 90%;
		background-color: #ff65af;
		}
	}
}
  

</style>