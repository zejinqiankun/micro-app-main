<template>
  <div class="login">
    <el-form ref="form" :model="form">
      <el-form-item>
        <el-input v-model="form.userName" placeholder="请输入用户名">
          <i slot="prefix" class="el-icon-user"></i>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.password" type="password" placeholder="请输入密码">
          <i slot="prefix" class="el-icon-lock"></i>
        </el-input>
      </el-form-item>
    </el-form>
    <div style="text-align: center">
      <el-button style="width:150px" type="primary" @click="onSubmit">登&nbsp;&nbsp;&nbsp;录</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        userName: '',
        password: ''
      }
    };
  },
  methods: {
    onSubmit() {
      if (this.form.userName && this.form.password) {
        this.$store.dispatch('setUserInfo', this.form);
        this.$router.push({name: 'home'})
      }
    },
  }
};
</script>
<style lang="less" scoped>
.login {
  width: 300px;
  margin: 0 auto;
  transform: translateY(150px);
}
</style>

