<template>
  <div class="menus-body" @mouseleave="cgIndexOut">
    <div class="menus">
      <div
        class="menus-circur"
        @mouseover="showTabList(index)"
        @mouseout="hideTabList"
        :style="{borderRight: currentIndex===index?'none':'', color: currentIndex===index?'orange':''}"
        v-for="(item, index) in cityList"
        :key="index"
      >
        <el-row type="flex" justify="space-between" align="middle" class="menu-item">
          <span>{{item.type}}</span>
          <i class="el-icon-arrow-right"></i>
        </el-row>
      </div>
    </div>
    <div
      class="sub-menus"
      v-show="isShow"
      @mouseover="showTabList(currentIndex)"
      @mouseleave="hideTabListAll"
    >
      <ul>
        <li v-for="(item,index) in tabContent" :key="item.city + index">
          <i>{{index + 1}}</i>
          <strong @click="sendCityName(item.city)">{{item.city}}</strong>
          <span @click="sendCityName(item.city)">{{item.desc}}</span>
        </li>
      </ul>
    </div>
    <div class="aside-recommend" @mouseenter="cgIndex">
      <nuxt-link to="/post#">
        <h4>推荐城市</h4>
        <img src="http://157.122.54.189:9093/images/pic_sea.jpeg" alt />
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cityList: [],
      currentIndex: 4,
      isShow: false,
      time: 0
    }
  },
  computed: {
    tabContent() {
      if (!this.cityList[this.currentIndex]) {
        return []
      }
      return this.cityList[this.currentIndex].children
    }
  },
  mounted() {
    this.getCityData()
  },
  methods: {
    getCityData() {
      this.$axios({
        url: '/posts/cities'
      }).then(({ data }) => {
        this.cityList = data.data
      })
    },
    showTabList(index) {
      this.currentIndex = index
      this.isShow = true
    },
    hideTabList(index) {
      this.isShow = false
    },
    sendCityName(data) {
      this.$emit('gainCityName', data)
    },
    cgIndexOut() {
      this.isShow = false
      this.currentIndex = 4
    },
    hideTabListAll() {
      this.isShow = false
      this.currentIndex = 4
    },
    cgIndex() {
      this.currentIndex = 4
    }
  }
}
</script>

<style lang="less" scoped>
.menus-body {
  position: relative;
}
.menus {
  width: 260px;
  border-bottom: 1px solid #ddd;
  .menus-circur {
    box-sizing: border-box;
    width: 260px;
    height: 41px;
    padding: 0 20px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-bottom: none;

    &:hover {
      border-right: none;
      span {
        color: orange;
      }
      i {
        color: orange;
      }
    }
  }
}
.menu-item {
  width: 100%;
  height: 100%;
}
.sub-menus {
  box-sizing: border-box;
  width: 350px;
  padding: 10px 20px;
  position: absolute;
  right: -319px;
  top: 0;
  border: 1px solid #ddd;
  border-left: none;
  background-color: #fff;
  z-index: 999;
  &::before {
    content: '';
    display: block;
    width: 1px;
    height: 53px;
    background-color: #ddd;
    position: absolute;
    bottom: 0;
    left: -1px;
  }
  ul {
    li {
      vertical-align: middle;
      font-size: 14px;
      left: 36px;
      line-height: 36px;
    }
  }
  i {
    position: relative;
    top: 3px;
    color: orange;
    font-size: 24px;
    font-style: italic;
  }
  strong {
    margin: 0 10px;
    color: orange;
    font-weight: 400;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  span {
    color: #999;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
      color: orange;
    }
  }
}
.aside-recommend {
  width: 260px;
  margin-top: 20px;
  h4 {
    font-weight: 400;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
    margin-bottom: 10px;
  }
  img {
    display: block;
    width: 100%;
    cursor: pointer;
  }
}
</style>