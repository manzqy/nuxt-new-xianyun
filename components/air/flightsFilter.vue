<template>
  <div class="filters">
    <el-row type="flex" justify="space-between" align="middle" class="filters-top">
      <el-col :span="8">
        单程：
        {{cityData.departCity}} - {{cityData.destCity}}
        /
        {{cityData.departDate}}
      </el-col>
      <el-col :span="4">
        <el-select
          size="mini"
          v-model="filterData.airport"
          placeholder="起飞机场"
          @change="handleFilter"
        >
          <el-option
            v-for="(item,index) in options.airport"
            :label="item"
            :value="item"
            :key="item + index"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select
          size="mini"
          v-model="filterData.flightTime"
          placeholder="起飞时间"
          @change="handleFilter"
        >
          <el-option
            :label="`${item.from < 10 ? '0' + item.from : item.from}:00 - ${item.to < 10 ? '0' + item.to : item.to}:00`"
            :value="`${item.from},${item.to}`"
            v-for="(item,index) in options.flightTimes"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select
          size="mini"
          v-model="filterData.airCompany"
          placeholder="航空公司"
          @change="handleFilter"
        >
          <el-option
            :label="item"
            :value="item"
            v-for="(item,index) in options.company"
            :key="item + index"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select
          size="mini"
          v-model="filterData.airModel"
          placeholder="机型"
          @change="handleFilter"
        >
          <el-option
            :label="item.name"
            :value="item.size"
            v-for="(item,index) in sizeOptions"
            :key="item.size + index"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button type="primary" size="mini" round plain @click="cacelOperation">撤销</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    allData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      filterData: {
        airport: '',
        flightTime: '',
        airCompany: '',
        airModel: ''
      },
      sizeOptions: [
        { name: '大', size: 'L' },
        { name: '中', size: 'M' },
        { name: '小', size: 'S' }
      ]
    }
  },
  computed: {
    cityData() {
      return this.allData.info || {}
    },
    options() {
      return this.allData.options || {}
    }
  },
  methods: {
    handleFilter() {
      let arr = this.allData.flights
        .filter(v => {
          if (this.filterData.airport) {
            return v.org_airport_name === this.filterData.airport
          }
          return true
        })
        .filter(v => {
          if (this.filterData.flightTime) {
            const [from, to] = this.filterData.flightTime.split(',')
            const startTime = +v.dep_time.split(':')[0]
            return startTime > from && startTime < to
          }
          return true
        })
        .filter(v => {
          if (this.filterData.airCompany) {
            return v.airline_name === this.filterData.airCompany
          }
          return true
        })
        .filter(v => {
          if (this.filterData.airModel) {
            return v.plane_size === this.filterData.airModel
          }
          return true
        })
      this.$emit('setData', arr)
    },
    cacelOperation() {
      this.filterData = {}
      this.$emit('setData', this.allData.flights)
    }
  }
}
</script>

<style lang="less" scoped>
.filters {
  margin-bottom: 20px;
}

.filters-top {
  /deep/ .el-select {
    margin-left: 10px;
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>