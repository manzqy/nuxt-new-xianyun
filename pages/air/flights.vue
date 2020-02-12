<template>
  <section class="container">
    <el-row type="flex" justify="space-between">
      <div class="flights-content">
        <div></div>
        <FlightsHeader />
        <div>
          <FlightsItem v-for="(item,index) in airList" :key="item.id + index" :data="item"/>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSizes"
            layout="total, sizes, prev, pager, next, jumper"
            :total="allData.total">
          </el-pagination>
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
      currentData: [],
      currentPage: 1,
      pageSizes: 5
    }
  },
  computed: {
    airList() {
      if (this.currentData.length === 0) {
        return []
      }
      return this.currentData.slice((this.currentPage - 1) * this.pageSizes, this.currentPage * this.pageSizes)
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
    },
    handleSizeChange(data) {
      this.pageSizes = data
    },
    handleCurrentChange(data) {
      this.currentPage = data
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