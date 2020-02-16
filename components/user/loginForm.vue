<template>
  <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" class="demo-ruleForm">
    <el-form-item prop="username">
      <el-input type="text" v-model="ruleForm2.username" auto-complete="off" placeholder="用户名/手机"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="ruleForm2.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <p class="forgetPass"><a href="/user/login#">忘记密码</a></p>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      }
      let reg = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/
      setTimeout(() => {
        if (!reg.test(value)) {
          callback(new Error('请输入有效手机号'))
        } else {
          callback()
        }
      }, 1000)
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      ruleForm2: {
        username: '13800138000',
        password: '123456'
      },
      rules2: {
        username: [{ validator: checkName, trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.dispatch('user/login', this.ruleForm2).then((res) => {
          setTimeout(() => {
            this.$message.success('登录成功')
            if (this.$route.query.returnUrl) {
              this.$router.replace(this.$route.query.returnUrl)
              return
            }
            this.$router.replace('/')
          }, 1000)
          })
        } else {
          this.$message.error('用户名或密码输入错误')
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.el-button {
  width: 100%;
}
/deep/.el-form-item.is-success .el-input__inner, .el-form-item.is-success .el-input__inner:focus, .el-form-item.is-success .el-textarea__inner, .el-form-item.is-success .el-textarea__inner:focus {
  border-color: #67c23a;
}
.forgetPass {
  text-align: right;
  padding-bottom: 3px;
  a {
    position: relative;
    top: -6px;
    color: #409eff;
    font-size: 12px;
  }
}
</style>