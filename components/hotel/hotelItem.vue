<template>
  <div class="hotel-list" v-if="data">
    <el-row class="hotel-item" style="margin-left:-10px;margin-right:-10px">
      <el-col :span="8" class="addPadding" @click="toHotelDetail">
        <span class="img-wrapper">
          <img :src="data.photos" alt />
        </span>
      </el-col>
      <el-col :span="10" class="addPadding">
        <h4 class="hotel-cn-name" @click="toHotelDetail">{{data.name}}</h4>
        <div class="hotel-en-name">
          <span>{{data.alias}}</span>
          <div>
            <span :title="data.hotellevel && data.hotellevel.name">
              <i
                class="iconfont iconhuangguan"
                v-for="item in data.hotellevel && data.hotellevel.level"
                :key="item"
              ></i>
            </span>
            <span>{{data.hoteltype && data.hoteltype.name}}</span>
          </div>
        </div>
        <el-row>
          <el-col :span="10">
            <el-rate
              v-model="data.stars"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            ></el-rate>
          </el-col>
          <el-col :span="7">
            <span class="height-light">{{data.all_remarks}}</span> 条评价
          </el-col>
          <el-col :span="7">
            <span class="height-light">{{data.visits_week}}</span> 篇游记
          </el-col>
        </el-row>
        <div class="hotel-summary-row"></div>
        <div class="location-row">
          <i class="iconfont iconlocation"></i>
          位于: {{data.address}}
        </div>
      </el-col>
      <el-col :span="6" class="addPadding">
        <div class="price-col">
          <el-table :data="data.products" :show-header="false">
            <el-table-column prop="name" label="日期" width="100"></el-table-column>
            <el-table-column label="姓名" width="180">
              <template slot-scope="scope">
                <div class="cell">
                  <span class="height-light larger">￥{{scope.row.price}}</span>起
                  <i class="el-icon-arrow-right"></i>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: ['data'],
  data() {
    return {
      value: 4,
      tableData: {}
    }
  },
  methods: {
    toHotelDetail() {
      this.$router.push({
        path: `/hotel/${this.data.id}`
      })
    }
  }
}
</script>

<style lang="less" scoped>
.hotel-item {
  padding: 25px 0;
  border-bottom: 1px solid #eee;
}
.img-wrapper {
  width: 420px;
  img {
    width: 320px;
    height: 210px;
  }
}
.hotel-cn-name {
  font-weight: 400;
  font-size: x-large;
  &:hover {
    color: #f90;
    position: relative;
    top: -2px;
  }
}
.hotel-en-name {
  color: #999;
  margin-bottom: 0.5em;
}
.iconhuangguan {
  color: #f90;
}
.iconfont {
  font-family: 'iconfont' !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.height-light {
  color: #f90;
}
.hotel-summary-row {
  font-size: 14px;
  color: #666;
}
.location-row {
  font-size: 14px;
  color: #666;
}
.price-col {
  margin-top: 20px;
}
.cell {
  box-sizing: border-box;
  white-space: normal;
  word-break: break-all;
  line-height: 23px;
}
.larger {
  font-size: large;
}
.addPadding {
  padding: 0 10px;
  cursor: pointer;
}
.hotel-summary-row {
  margin: 1em 0;
}
/deep/ .el-table--scrollable-x .el-table__body-wrapper {
  overflow-x: hidden;
}
</style>