<template>
  <div>
    <div class="list-filter">
      <el-row type="flex" justify="start">
        <el-col :span="8" class="filter-col">
          <el-row type="flex" justify="space-between" class="filter-title">
            <div>价格</div>
            <div>0-4000</div>
          </el-row>
          <el-row>
            <el-slider v-model="value2" @change="changePrice"></el-slider>
          </el-row>
        </el-col>
        <el-col :span="6" class="filter-col">
          <el-row class="filter-title" type="flex">
            <div>住宿等级</div>
          </el-row>
          <el-row class="filter-wrapper" type="flex" justify="space-between">
            <el-dropdown trigger="click" style="width: 100%">
              <el-row type="flex" justify="space-between" class="el-dropdown-link">
                <span>{{levels}}</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-row>
              <el-dropdown-menu slot="dropdown" class="el-popper">
                <div class="filter-view-menu-box">
                  <ul>
                    <li
                      class="el-dropdown-menu__item"
                      v-for="(item,index) in options.levels"
                      :key="item.id"
                      @click="addIndex('levels', index)"
                    >
                      <i
                        :class="{'iconfont':true,'iconcircle': !item.isShow,'iconright-1':item.isShow}"
                      ></i>
                      <span class="dropdown-menu-text">{{item.name}}</span>
                    </li>
                  </ul>
                </div>
              </el-dropdown-menu>
            </el-dropdown>
          </el-row>
        </el-col>
        <el-col :span="6" class="filter-col">
          <el-row class="filter-title" type="flex">
            <div>住宿类型</div>
          </el-row>
          <el-row class="filter-wrapper" type="flex" justify="space-between">
            <el-dropdown trigger="click" style="width: 100%">
              <el-row type="flex" justify="space-between" class="el-dropdown-link">
                <span>{{types}}</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-row>
              <el-dropdown-menu slot="dropdown">
                <div class="filter-view-menu-box">
                  <ul>
                    <li
                      class="el-dropdown-menu__item"
                      v-for="(item,index) in options.types"
                      :key="item.id"
                      @click="addIndex('types', index)"
                    >
                      <i
                        :class="{'iconfont':true,'iconcircle': !item.isShow,'iconright-1':item.isShow}"
                      ></i>
                      <span class="dropdown-menu-text">{{item.name}}</span>
                    </li>
                  </ul>
                </div>
              </el-dropdown-menu>
            </el-dropdown>
          </el-row>
        </el-col>
        <el-col :span="6" class="filter-col">
          <el-row class="filter-title" type="flex">
            <div>酒店设施</div>
          </el-row>
          <el-row class="filter-wrapper" type="flex" justify="space-between">
            <el-dropdown trigger="click" style="width: 100%">
              <el-row type="flex" justify="space-between" class="el-dropdown-link">
                <span>{{assets}}</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-row>
              <el-dropdown-menu slot="dropdown">
                <div class="filter-view-menu-box">
                  <ul>
                    <li
                      class="el-dropdown-menu__item"
                      v-for="(item,index) in options.assets"
                      :key="item.id"
                      @click="addIndex('assets', index)"
                    >
                      <i
                        :class="{'iconfont':true,'iconcircle': !item.isShow,'iconright-1':item.isShow}"
                      ></i>
                      <span class="dropdown-menu-text">{{item.name}}</span>
                    </li>
                  </ul>
                </div>
              </el-dropdown-menu>
            </el-dropdown>
          </el-row>
        </el-col>
        <el-col :span="6" class="filter-col removeBorder">
          <el-row class="filter-title" type="flex">
            <div>酒店品牌</div>
          </el-row>
          <el-row class="filter-wrapper" type="flex" justify="space-between">
            <el-dropdown trigger="click" style="width: 100%">
              <el-row type="flex" justify="space-between" class="el-dropdown-link">
                <span>{{brands}}</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-row>
              <el-dropdown-menu slot="dropdown">
                <div class="filter-view-menu-box">
                  <ul>
                    <li
                      class="el-dropdown-menu__item"
                      v-for="(item,index) in options.brands"
                      :key="item.id"
                      @click="addIndex('brands', index)"
                    >
                      <i
                        :class="{'iconfont':true,'iconcircle': !item.isShow,'iconright-1':item.isShow}"
                      ></i>
                      <span class="dropdown-menu-text">{{item.name}}</span>
                    </li>
                  </ul>
                </div>
              </el-dropdown-menu>
            </el-dropdown>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <HotelItem v-for="item in hotelData" :key="item.id" :data="item" v-loading="loading"/>
    <el-card class="box-card" v-loading="loading" v-if="!hotelData.length">
      <div class="noData">暂无该酒店数据</div>
    </el-card>
    <el-row type="flex" justify="end" style="padding:15px" v-if="hotelData.length">
      <el-pagination
        small
        layout="prev, pager, next"
        prev-text="上一页"
        next-text="下一页"
        :current-page="currentPage"
        @current-change="handleCurrentChange"
        :total="total"
      ></el-pagination>
    </el-row>
  </div>
</template>

<script>
import HotelItem from './hotelItem'
export default {
  props: ['cityId', 'enterTime', 'leftTime'],
  components: {
    HotelItem
  },
  data() {
    return {
      value2: 4000,
      total: 0,
      hotelData: [],
      currentPage: 1,
      loading: true,
      options: {
        levels: [],
        types: [],
        assets: [],
        brands: []
      },
      choose: {
        levels: [],
        types: [],
        assets: [],
        brands: []
      },
      type: {
        levels: ['hotellevel', 'hotellevel_in'],
        types: ['hoteltype', 'hoteltype_in'],
        assets: ['hotelasset', 'hotelasset_in'],
        brands: ['hotelbrand', 'hotelbrand_in']
      }
    }
  },
  computed: {
    // 监听取到的值
    levels() {
      const len = this.choose.levels.length
      const index = this.choose.levels[0] - 1
      if (len === 0) {
        return '不限'
      } else if (len === 1) {
        return this.options.levels[index].name
      } else {
        return `已选择${len}项`
      }
    },
    types() {
      const len = this.choose.types.length
      const index = this.choose.types[0] - 1
      if (len === 0) {
        return '不限'
      } else if (len === 1) {
        return this.options.types[index].name
      } else {
        return `已选择${len}项`
      }
    },
    assets() {
      const len = this.choose.assets.length
      const index = this.choose.assets[0] - 1
      if (len === 0) {
        return '不限'
      } else if (len === 1) {
        return this.options.assets[index].name
      } else {
        return `已选择${len}项`
      }
    },
    brands() {
      const len = this.choose.brands.length
      const index = this.choose.brands[0] - 1
      if (len === 0) {
        return '不限'
      } else if (len === 1) {
        return this.options.brands[index].name
      } else {
        return `已选择${len}项`
      }
    }
  },
  watch: {
    cityId() {
      this.submitOptions()
    },
    enterTime(newValue, oldValue) {
      this.submitOptions()
    },
    leftTime(newValue, oldValue) {}
  },
  mounted() {
    this.getOptions()
    const { query } = this.$route
    let url = this.parseUrl(query)
    this.getDetailData(url)
  },
  methods: {
    getOptions() {
      this.$axios({
        url: '/hotels/options'
      }).then(({ data }) => {
        this.options = data.data
        Object.keys(data.data).forEach(v => {
          this.options[v].forEach(v => {
            v.isShow = false
          })
        })
      })
    },
    getDetailData(data) {
      let url
      if (data) {
        url = data
      } else {
        url = this.updateData()
      }
      this.$axios({
        url: `/hotels${url}`
      }).then(({ data }) => {
        this.total = data.total
        this.hotelData = data.data
        this.loading = false
        this.loading = false
      })
    },
    handleCurrentChange(data) {
      this.currentPage = data
      this.submitOptions()
    },
    changePrice() {
      this.submitOptions()
    },
    // 返回时解析url重新发送请求
    parseUrl(data) {
      let url = '?'
      Object.keys(data).forEach(v => {
        if (typeof data[v] === 'string') {
          url += v + '=' + data[v] + '&'
        } else if (data[v].length) {
          data[v].forEach(item => {
            url += v + '=' + item + '&'
          })
        }
      })
      url = url.slice(0, url.length - 1)
      return url
    },
    addIndex(name, index) {
      let url
      this.options[name][index].isShow = !this.options[name][index].isShow
      this.options[name] = this.options[name].slice()
      // 去重复
      const currentIndex = this.choose[name].indexOf(index + 1)
      if (currentIndex !== -1) {
        this.choose[name].splice(currentIndex, 1)
        this.submitOptions()
        return
      }
      this.choose[name].push(index + 1)
      this.submitOptions()
    },
    // 拼接url
    submitOptions() {
      this.loading = true
      let url
      url = this.updateData(false)
      if (this.enterTime) {
        url += '&enterTime=' + this.enterTime + '&leftTime=' + this.leftTime
      }
      if (this.currentPage !== 1) {
        url += '&_start=' + (this.currentPage - 1) * 5
      }
      const { fullPath } = this.$route
      if (fullPath == `/hotel${url}`) {
        return
      }
      this.getDetailData(url)
      this.$router.replace({
        path: `/hotel${url}`
      })
    },
    updateData(key = true) {
      let url = `?price_lt=${this.value2 * 40}`
      Object.keys(this.choose).forEach(v => {
        if (this.choose[v].length === 1) {
          if (v !== 'brands') {
            url += `&${this.type[v][0]}=${this.choose[v][0]}`
          } else {
            url += `&${this.type[v][0]}=${this.choose[v][0] + 3}`
          }
        } else if (this.choose[v].length > 1) {
          if (v !== 'brands') {
            this.choose[v].forEach(item => {
              url += '&' + this.type[v][1] + '=' + item
            })
          } else {
            this.choose[v].forEach(item => {
              url += '&' + this.type[v][1] + '=' + (item + 3)
            })
          }
        } else {
        }
      })
      if (this.cityId) {
        url += `&city=${this.cityId}`
      }
      key && this.getDetailData(url)
      return url
    }
  }
}
</script>

<style lang="less" scoped>
.list-filter {
  border: 1px solid #ddd;
  padding: 5px 0 5px 0;
  color: #666;
}
.filter-col {
  border-right: 1px solid #ddd;
  padding: 5px 20px;
}
.filter-title {
  font-size: 14px;
}
.filter-wrapper {
  height: 38px;
  display: flex;
  align-items: center;
}
.removeBorder {
  border-right: none;
}
.el-popper {
  margin-top: 12px;
}
.filter-view-menu-box {
  max-height: 230px;
  overflow: auto;
  cursor: pointer;
}
.el-dropdown-menu__item {
  list-style: none;
  line-height: 36px;
  margin: 0;
  font-size: 14px;
  color: #606266;
  cursor: pointer;
  outline: 0;
  .dropdown-menu-text {
    display: inline-block;
    min-width: 100px;
    margin-left: 10px;
  }
}
.el-dropdown-link {
  cursor: pointer;
}
/deep/ .el-pagination .btn-prev {
  border: 1px solid #ccc;
  border-left: 3px solid green;
  padding: 0 5px;
  border-radius: 3px;
}
/deep/ .el-pagination .btn-next {
  border: 1px solid #ccc;
  border-right: 3px solid green;
  padding: 0 5px;
  border-radius: 3px;
}
.noData {
  padding: 50px 0;
  font-size: 22px;
  margin: 0 auto;
  color: #E6A23C;
  text-align: center;
}
.box-card {
  margin-top: 15px;
  border-top: 2px solid #E6A23C;
  box-shadow: 0 0 0 #fff;
}
</style>