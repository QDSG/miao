<template>
    <div class="add-new-address">
     <div class="header">
        <span class="toProfile" @touchstart="handleToBack">
            <i class="el-icon-arrow-left" ></i>
        </span>
        <h3>新增收货地址</h3>
      </div>
      <div class="mainnn">
        <el-form :model="newAddForm" :rules="rules" :label-position="'left'" ref="newAddForm" label-width="100px" class="newAddForm">
          <el-form-item label="收货人" prop="name">
            <el-input v-model="newAddForm.name"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input v-model.number="newAddForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="所在城市" prop="city">
            <el-input v-model="newAddForm.city"></el-input>
          </el-form-item>
          <el-form-item label="收货地址" prop="detailAdd">
            <el-input v-model="newAddForm.detailAdd"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="footer">
            <el-button type="primary" @click="submitForm('newAddForm')">保存收货地址</el-button>
            <el-button type="danger" @click="resetForm('newAddForm')">重置</el-button>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    let validatePhone = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('手机号不能为空'));
        } else if (!/^1[3-9]{1}[0-9]{9}$/.test(value)) {
            return callback(new Error('手机号不正确'));
        } else {
            callback();
        }
    };
    return {
      newAddForm: {
        name: '',
        phone: '',
        city: '',
        detailAdd: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入名字', trigger: 'blur' }
        ],
        phone: [
          {required: true, validator: validatePhone, trigger: 'blur'}
        ],
        city: [
          { required: true, message: '请输入所在城市', trigger: 'blur' }
        ],
        detailAdd: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    handleToBack(){
		this.$router.back();
	},
    submitForm(formName) {
		this.$refs[formName].validate((valid) => {
			if (valid) {
				this.$store.commit('addNewAddress', this.newAddForm);

				this.$router.push.back()
			} else {
				return false;
			}
		});
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }

}
</script>

<style lang="scss" scoped>
.add-new-address{
  width: 100%;
	height: 100%;
	position: absolute;
	z-index: 1001;
	background-color: #f5f5f5;
	.header{
		position: relative;
		height: 50px;
		text-align: center;
		border-bottom: 1px solid #eee;
		line-height: 50px;
		background-color: #fff;
		.toProfile i{
		position: absolute;
		left: 10px;
		font-size: 20px;
		top: 50%;
		transform: translateY(-50%);
		}
	}
  .mainnn{
    background-color: #fff;
    margin-top: 10px;
    padding: 10px;
  }
  .footer{
	margin-top: 50px;
	text-align: center;
  }
}
</style>