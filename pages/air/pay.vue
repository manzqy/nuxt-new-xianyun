<template>
  <div class="container">
    <div class="main">
      <div class="pay-title">
        支付总金额
        <span class="pay-price">￥ {{infoData.price}}</span>
      </div>
      <div class="pay-main">
        <h4>微信支付</h4>
        <el-row type="flex" justify="space-between" align="middle" class="pay-qrcode">
          <div class="qrcode">
            <!-- 二维码 -->
            <canvas id="qrcode-stage" ref="qrcode_img"></canvas>
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
          </div>
          <div class="pay-example">
            <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt />
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode'
export default {
  data () {
    return {
      infoData: {
        users: {}
      },
      time: null
    }
  },
  methods: {
    payChecked(data) {
      const {id} = this.$route.query
      const {userInfo} = this.$store.state.user
      return this.$axios({
        method: 'post',
        url: '/airorders/checkpay',
        headers: {
          Authorization: 'Bearer ' + userInfo.token
        },
        data: {
          id,
          nonce_str: data.payInfo.nonce_str,
          out_trade_no: data.payInfo.order_no
        }
      }).then(({data}) => {
        if (data.statusTxt === '支付完成') {
          this.$alert(data.statusTxt, '提示', {
          confirmButtonText: '确定',
          type: 'warning'
          })
          return Promise.resolve(true)
        }
        return Promise.resolve(false)
      })
    }
  },
  mounted() {
    setTimeout(() => {
      const {id} = this.$route.query
      const {userInfo} = this.$store.state.user
      this.$axios({
        url: `/airorders/${id}`,
        headers: {
          Authorization: `Bearer ` + userInfo.token
        }
      }).then(({data}) => {
        this.infoData = data
        QRCode.toCanvas(this.$refs.qrcode_img, data.payInfo.code_url, {
          width: 200
        })
        this.time = setInterval(async () => {
          const isPay = await this.payChecked(data)
          if (isPay) {
            clearInterval(this.time)
            return
          }
        },3000)
      })
    }, 200);
  },
  destroyed() {
    clearInterval(this.time)
  }
}
</script>

<style scoped lang="less">
.container {
  background: #f5f5f5;
  padding: 30px 0;

  .main {
    width: 1000px;
    margin: 0 auto;

    .pay-title {
      text-align: right;
      span {
        font-size: 28px;
        color: orangered;
      }
    }

    .pay-main {
      background: #fff;
      margin-top: 10px;
      border-top: 5px orange solid;
      padding: 30px;

      h4 {
        font-size: 28px;
        font-weight: normal;
        margin-bottom: 10px;
      }

      .pay-qrcode {
        padding: 0 80px;
      }

      .qrcode {
        border: 1px #ddd solid;
        padding: 15px;
        height: fit-content;

        #qrcode-stage {
          width: 200px;
          height: 200px;
          margin-bottom: 10px;
        }

        p {
          line-height: 2;
          text-align: center;
        }
      }
    }
  }
}
</style>