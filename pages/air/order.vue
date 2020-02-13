<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 -->
      <div class="main">
        <OrderForm :data="infoData" @sendAllPrice="recPrice"/>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <OrderAside :data="infoData" :allPrice="allPrice"/>
      </div>
    </el-row>
  </div>
</template>

<script>
import OrderForm from '@/components/air/orderForm'
import OrderAside from '@/components/air/orderAside'
export default {
  components: {
    OrderForm,
    OrderAside
  },
  data () {
    return {
      infoData: {},
      allPrice: ''
    }
  },
  mounted() {
    const userId = this.$route.query
    this.$axios({
      url: `/airs/${userId.id}`,
      params: {seat_xid: userId.seat_xid}
    }).then(({data}) => {
      console.log(data)
      this.infoData = data
    })
  },
  methods: {
    recPrice(data) {
      this.allPrice = data + ''
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
}

/*aside*/
.aside {
  width: 350px;
  height: fit-content;
  border: 1px #ddd solid;
}
</style>