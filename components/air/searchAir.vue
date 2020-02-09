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
        ></el-date-picker>
      </el-form-item>
      <el-form-item label>
        <el-button
          type="primary"
          style="width: 100%"
          icon="el-icon-search"
          @click="handleSubmit"
        >搜索</el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
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
          callback: action => {
          }
        })
      }
    },
    handleDepartSelect() {},
    handleDestSelect() {},
    handleDate() {},
    handleSubmit() {},
    handleReverse() {
      const temp = this.form.departCity
      this.form.departCity = this.form.destCity
      this.form.destCity = temp
    },
    queryDepartSearch(value, callback) {
      callback([
        { value: '1' },
        { value: '2' },
        { value: '3' }
      ])
    },
    queryDestSearch(value, callback) {
      callback([
        { value: '1' },
        { value: '2' },
        { value: '3' }
      ])
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