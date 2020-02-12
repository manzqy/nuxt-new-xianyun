<template>
  <section class="container">
    <el-row type="flex" justify="space-between">
      <div class="flights-content">
        <div></div>
        <FlightsHeader />
        <div>
          <FlightsItem v-for="(item,index) in currentData" :key="item.id + index" :data="item"/>
        </div>
      </div>
      <div class="aside"></div>
    </el-row>
  </section>
</template>

<script>
import FlightsHeader from '@/components/air/flightsHeader'
import FlightsItem from '@/components/air/flightsItem'
export default {
  components: {
    FlightsHeader,
    FlightsItem
  },
  data () {
    return {
      allData: {},
      currentData: []
    }
  },
  methods: {
    getAirList() {
      this.$axios({
        url: '/airs',
        params: this.$route.query
      }).then((res) => {
        console.log(res.data)
        const data = res.data
        this.allData = data
        this.currentData = data.flights
      })
    }
  },
  mounted () {
    console.log(this.$route)
    this.getAirList()
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>