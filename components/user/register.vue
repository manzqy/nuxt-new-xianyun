<template>
  <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" class="demo-ruleForm">
    <el-form-item prop="username">
      <el-input type="text" v-model="ruleForm2.username" auto-complete="off" placeholder="用户名/手机"></el-input>
    </el-form-item>
    <el-form-item style="margin-top: 15px;" prop="captcha">
      <el-input
        placeholder="验证码"
        v-model="ruleForm2.captcha"
        auto-complete="off"
        class="input-with-select"
      >
        <el-button slot="append" @click="openCaptcha">发送验证码</el-button>
      </el-input>
    </el-form-item>
    <el-form-item prop="nickname">
      <el-input type="text" v-model="ruleForm2.nickname" auto-complete="off" placeholder="你的名字"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="ruleForm2.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item prop="cpassword">
      <el-input
        type="password"
        v-model="ruleForm2.cpassword"
        auto-complete="off"
        placeholder="确认密码"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm2')">注册</el-button>
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
    var validateCaptcha = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'))
      } else {
        const reg = /^\d{6}$/
        if (reg.test(value)) {
          callback()
        } else {
          callback(new Error('验证码不正确'))
        }
      }
    }
    var validateNickName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入昵称'))
      } else {
        const reg = /\S+/
        if (reg.test(value)) {
          callback()
        } else {
          callback(new Error('昵称只能输入数字、字母、下划线'))
        }
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm2.cpassword !== '') {
          this.$refs.ruleForm2.validateField('cpassword')
        }
        callback()
      }
    }
    var validateCpass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请确认密码'))
      } else {
        if (this.ruleForm2.password !== value) {
          callback(new Error('密码输入不一致'))
        } else {
          callback()
        }
      }
    }
    return {
      ruleForm2: {
        username: '18839199636',
        password: '123456',
        nickname: '北宫未央',
        captcha: '',
        cpassword: '123456'
      },
      rules2: {
        username: [{ validator: checkName, trigger: 'blur' }],
        captcha: [{ validator: validateCaptcha, trigger: 'blur' }],
        nickname: [{ validator: validateNickName, trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }],
        cpassword: [{ validator: validateCpass, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let { cpassword, ...data } = this.ruleForm2
          this.$store.dispatch('user/register', data).then(() => {
            this.$message.success('登录成功,正在跳转中...')
            this.$router.replace('/')
          })
        } else {
          this.$message.error('信息填写全部才能注册')
          return false
        }
      })
    },
    openCaptcha() {
      if (!this.ruleForm2.username) {
        this.$alert('手机号不能为空', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
          callback: action => {}
        })
      } else if (this.ruleForm2.username.length !== 11) {
        this.$alert('手机号格式不对', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
          callback: action => {}
        })
      } else {
        this.$store
          .dispatch('user/sendCaptcha', { tel: this.ruleForm2.username })
          .then(({ data }) => {
            this.ruleForm2.captcha = data.code
            this.$message.success('模拟手机验证码为:' + data.code)
          })
      }
    }
  }
}
</script>
<style lang="less" scoped>
/deep/.el-button {
  width: 100%;
}
/deep/.el-form-item.is-success .el-input__inner,
.el-form-item.is-success .el-input__inner:focus,
.el-form-item.is-success .el-textarea__inner,
.el-form-item.is-success .el-textarea__inner:focus {
  border-color: #67c23a;
}
</style>