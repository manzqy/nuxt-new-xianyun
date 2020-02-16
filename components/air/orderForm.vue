<template>
  <div class="main">
    <div class="air-column">
      <h2>乘机人</h2>
      <el-form class="member-info">
        <div
          class="member-info-item"
          :model="userInfo"
          v-for="(item, index) in userInfo"
          :key="index"
        >
          <el-form-item label="乘机人类型">
            <el-input placeholder="姓名" class="input-with-select" v-model="item.username">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input placeholder="证件号码" class="input-with-select" v-model="item.id">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers">添加乘机人</el-button>
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div
          class="insurance-item"
          v-for="(item, index) in data.insurances"
          :key="item.type + index"
        >
          <el-checkbox
            :label="`${item.type}：￥${item.price}/份×${userInfo.length}  最高赔付${item.compensation}`"
            border
            @change="addInsuranceId(item.id)"
          ></el-checkbox>
        </div>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机">
            <el-input placeholder="请输入内容" v-model="contactPhone">
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model="captcha"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
      </div>
    </div>
    <input type="hidden" :value="totalPrice"/>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {
          insurances: {}
        }
      }
    }
  },
  data() {
    return {
      creit: '',
      userInfo: [
        { username: '', id: '' }
      ],
      insurances: [],
      contactName: '',
      contactPhone: '13812345612',
      captcha: '',
      invoice: false
    }
  },
  computed: {
    totalPrice() {
      if (!this.data.seat_infos) {
        return ''
      }
      let price = 0
      let len = this.userInfo.length
      price += this.data.seat_infos.org_settle_price * len
      this.data.insurances.forEach(v => {
        if (this.insurances.indexOf(v.id) > -1) {
          price += v.price * len
        }
      })
      price += this.data.airport_tax_audlet * len
      this.$emit('sendAllPrice', {
        price,
        len
      })
      return price
    }
  },
  methods: {
    // 添加乘机人
    handleAddUsers() {
      this.userInfo.push({
        username: '',
        id: ''
      })
    },

    // 移除乘机人
    handleDeleteUser(index) {
      this.userInfo.splice(index, 1)
    },

    // 发送手机验证码
    handleSendCaptcha() {
      if (!this.contactPhone) {
        return this.$alert('手机号码不能为空', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
      }
      const reg = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/
      if (!reg.test(this.contactPhone)) {
        return this.$alert('手机号码输入错误', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
      }
      this.$store.dispatch('user/sendCaptcha', {tel: this.contactPhone}).then(({data}) => {
        this.$message.success(`手机验证码为模拟验真：${data.code}`)
        this.captcha = '000000'
      })
    },

    // 提交订单
    handleSubmit() {
      const submitData = {
        users: this.userInfo,
        insurances: this.insurances,
        contactName: this.contactName,
        contactPhone: this.contactPhone,
        captcha: this.captcha,
        seat_xid: this.data.seat_infos.seat_xid,
        air: this.data.id,
        invoice: this.invoice
      }
      const rules = {
        users: {
          errMessage: '用户名或者身份证不能为空',
          validator: () => {
            let valid = true
            submitData.users.forEach(v => {
              if (!v.username || !v.id) {
                valid = false
              }
            })
            return valid
          }
        },
        contactName: {
          errMessage: '联系人姓名不能为空',
          validator: () => {
            if (!submitData.contactName) {
              return false
            }
            return true
          }
        },
        contactPhone: {
          errMessage: '手机号不能为空',
          validator: () => {
            if (!submitData.contactPhone) {
              return false
            }
            return true
          }
        },
        captcha: {
          errMessage: '手机验证码不能为空',
          validator: () => {
            if (!submitData.captcha) {
              return false
            }
            return true
          }
        }
      }
      var valid = true
      Object.keys(rules).forEach(v => {
        if (!valid) return
        valid = rules[v].validator()
        if (!valid) {
          this.$message.error(rules[v].errMessage)
        }
      })
      if (!valid) return
      const {user} = this.$store.state
      this.$message.success('订单正在生成中，请稍等...')
      this.$axios({
        method: 'post',
        url: '/airorders',
        data: submitData,
        headers: {
          Authorization: `Bearer ${user.userInfo.token || ''}`
        }
      }).then(({data}) => {
        const {id} = data.data
        this.$router.push({
          path: '/air/pay',
          query: {
            id
          }
        })
      })
    },
    addInsuranceId(id) {
      const index = this.insurances.indexOf(id)
      if (index !== -1) {
        this.insurances.splice(index, 1)
      } else {
        this.insurances = Array.from(new Set([...this.insurances, id]))
      }
    }
  }
}
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>