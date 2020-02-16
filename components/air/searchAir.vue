<template>
  <div class="search-form">
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabList"
        :key="index"
        :class="{active: index === currentIndex}"
        @click="handleTabList(index)"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>
    <el-form class="search-form-content" ref="form" label-width="80px">
      <el-form-item label="出发城市">
        <el-autocomplete
          :fetch-suggestions="queryDepartSearch"
          placeholder="请搜索出发城市"
          v-model="form.departCity"
          @select="handleDepartSelect"
          class="el-autocomplete"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          v-model="form.destCity"
          @select="handleDestSelect"
          class="el-autocomplete"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间">
        <el-date-picker
          type="date"
          placeholder="请选择日期"
          @change="handleDate"
          style="width: 100%"
          v-model="form.departDate"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label>
        <el-button type="primary" style="width: 100%" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      currentIndex: 0,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 24 * 3600 * 1000
        }
      },
      tabList: [
        {
          icon: 'iconfont icondancheng',
          name: '单程'
        },
        {
          icon: 'iconfont iconshuangxiang',
          name: '往返'
        }
      ],
      form: {
        departCity: '',
        departCode: '',
        destCity: '',
        destCode: '',
        departDate: ''
      }
    }
  },
  methods: {
    handleTabList(index) {
      if (index === 1) {
        this.$alert('目前暂不支持往返，后续功能添加中', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
          callback: action => {}
        })
      }
    },
    handleDepartSelect(data) {
      this.form.departCity = data.value
      this.form.departCode = data.sort
    },
    handleDestSelect(data) {
      this.form.destCity = data.value
      this.form.destCode = data.sort
    },
    handleDate(data) {
      this.form.departDate = moment(data).format('YYYY-MM-DD')
    },
    handleSubmit() {
      const rules = {
        depart: {
          value: this.form.departCity,
          message: '请搜索出发城市'
        },
        dest: {
          value: this.form.destCity,
          message: '请搜索到达城市'
        },
        departTime: {
          value: this.form.departDate,
          message: '请选择出发日期'
        }
      }
      let valid = true
      Object.keys(rules).forEach(v => {
        if (!valid) return
        if (!rules[v].value) {
          valid = false
          this.$alert(rules[v].message, '提示', {
            confirmButtonText: '确定',
            callback: action => {}
          })
        }
      })
      if (!valid) return
      let airHistory = this.$store.state.air.airHistory
      airHistory = [this.form, ...airHistory]
      // 对象去重
      const hash = {}
      airHistory = airHistory.reduce((item, next) => {
        hash[next.departCity + next.destCity + next.departDate]
          ? ''
          : (hash[next.departCity + next.destCity + next.departDate] =
              true && item.push(next))
        return item
      }, [])
      this.$store.commit('air/addAirHistory', airHistory)
      this.$router.push({
        path: '/air/flights',
        query: this.form
      })
    },
    handleReverse() {
      const { departCity, departCode, destCity, destCode } = this.form
      this.form.departCity = destCity
      this.form.departCode = destCode
      this.form.destCity = departCity
      this.form.destCode = departCode
    },
    async queryDepartSearch(value, callback) {
      let arr = await this.querySearchAsync(this.form.departCity)
      if (arr.length > 0) {
        this.form.departCity = arr[0].value
        this.form.departCode = arr[0].sort
      }
      callback(arr)
    },
    async queryDestSearch(value, callback) {
      let arr = await this.querySearchAsync(this.form.destCity)
      if (arr.length > 0) {
        this.form.destCity = arr[0].value
        this.form.destCode = arr[0].sort
      }
      callback(arr)
    },
    querySearchAsync(keywords) {
      return new Promise((resolve, reject) => {
        if (!keywords) {
          resolve([])
        }
        this.$store
          .dispatch('air/getCityName', { name: keywords })
          .then(({ data }) => {
            data = data.data.map(v => {
              return {
                ...v,
                value: v.name.replace('市', '')
              }
            })
            resolve(data)
          })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
    cursor: pointer;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: '';
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: '';
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>