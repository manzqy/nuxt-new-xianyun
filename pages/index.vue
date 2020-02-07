<template>
  <div>
    <div class="block">
      <el-carousel height="700px" :interval="5000" arrow="always">
        <el-carousel-item v-for="item in picList" :key="item.url">
          <div :style="{background: `url(${$axios.defaults.baseURL}${item.url}) no-repeat center`}" class="carousel-box"></div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      picList: []
    }
  },
  mounted() {
    this.$axios.get('/scenics/banners').then(({ data }) => {
      this.picList = data.data
    }).catch(() => {
      this.$message.error('请求数据错误')
    })
  }
}
</script>

<style lang="less" scoped>
.carousel-box {
  height: 700px;
  min-width: 1000px;
}
</style>