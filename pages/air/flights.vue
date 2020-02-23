<template>
<!-- 测试一下 -->
  <section class="container">
    <el-row type="flex" justify="space-between">
      <div class="flights-content">
        <div></div>
        <FlightsFilter :allData="allData" @setData = "setData"/>
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
      <div class="aside">
        <FlightsAside />
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightsHeader from '@/components/air/flightsHeader'
import FlightsItem from '@/components/air/flightsItem'
import FlightsFilter from '@/components/air/flightsFilter'
import FlightsAside from '@/components/air/flightsAside'
export default {
  components: {
    FlightsHeader,
    FlightsItem,
    FlightsFilter,
    FlightsAside
  },
  data () {
    return {
      allData: {},
      cacheAllData: {},
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
      this.currentPage = 1,
      this.$axios({
        url: '/airs',
        params: this.$route.query
      }).then((res) => {
        const data = res.data
        this.allData = data
        this.currentData = [...data.flights]
      })
    },
    handleSizeChange(data) {
      this.pageSizes = data
    },
    handleCurrentChange(data) {
      this.currentPage = data
    },
    setData(arr) {
      if (arr) {
        this.currentPage = 1
        this.allData.total = arr.length
        this.currentData = arr
      }
    }
  },
  watch: {
    '$route': 'getAirList'
  },
  mounted () {
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