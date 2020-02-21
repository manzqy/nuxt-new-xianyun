<template>
  <div>
    <div class="block">
      <el-carousel height="700px" :interval="5000" arrow="always">
        <el-carousel-item v-for="item in picList" :key="item.url">
          <div
            :style="{background: `url(${$axios.defaults.baseURL}${item.url}) no-repeat center`}"
            class="carousel-box"
          ></div>
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 搜索框 -->
    <div class="banner-content">
      <div class="search-bar">
        <!-- tab栏 -->
        <el-row type="flex" class="search-tab">
          <span
            v-for="(item, index) in tabList"
            :key="item.content"
            @click="handleSwitch(index)"
            :class="{active: index === currentIndex}"
          >
            <i>{{item.content}}</i>
          </span>
        </el-row>

        <!-- 输入框 -->
        <el-row type="flex" align="middle" class="search-input">
          <input :placeholder="tabList[currentIndex].placeholder" @keydown.13="searchContent"/>
          <i class="el-icon-search" @click="searchContent"></i>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      picList: [],
      tabList: [
        {
          content: '攻略',
          placeholder: '搜索城市'
        },
        {
          content: '酒店',
          placeholder: '请输入城市搜索酒店'
        },
        {
          content: '机票',
          placeholder: ''
        }
      ]
    }
  },
  mounted() {
    this.$axios
      .get('/scenics/banners')
      .then(({ data }) => {
        this.picList = data.data
      })
      .catch(() => {
        this.$message.error('请求数据错误')
      })
  },
  methods: {
    handleSwitch(index) {
      if (index === 2) {
        this.$router.push('/air')
      }
      this.currentIndex = index
    },
    //点击ico图标,完成了跳转到酒店首页上面去
    searchContent() { 
      this.$router.push('/hotel')
    }
  }
}
</script>

<style lang="less" scoped>
.carousel-box {
  height: 700px;
  min-width: 1000px;
}
.banner-content {
  z-index: 9;
  width: 1000px;
  position: absolute;
  left: 50%;
  top: 45%;
  margin-left: -500px;
  border-top: 1px transparent solid;

  .search-bar {
    width: 552px;
    margin: 0 auto;
  }

  .search-tab {
    .active {
      i {
        color: #333;
      }
      &::after {
        background: #eee;
      }
    }

    span {
      width: 82px;
      height: 36px;
      display: block;
      position: relative;
      margin-right: 8px;
      cursor: pointer;

      i {
        position: absolute;
        z-index: 2;
        display: block;
        width: 100%;
        height: 100%;
        line-height: 30px;
        text-align: center;
        color: #fff;
      }

      &:after {
        position: absolute;
        left: 0;
        top: 0;
        display: block;
        content: '';
        width: 100%;
        height: 100%;
        border: 1px rgba(255, 255, 255, 0.2) solid;
        border-bottom: none;
        transform: scale(1.1, 1.3) perspective(0.7em) rotateX(2.2deg);
        transform-origin: bottom left;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 1px 2px 0 0;
        box-sizing: border-box;
      }
    }
  }

  .search-input {
    width: 550px;
    height: 46px;
    background: #fff;
    border-radius: 0 4px 4px 4px;
    border: 1px rgba(255, 255, 255, 0.2) solid;
    border-top: none;
    box-sizing: unset;

    input {
      flex: 1;
      height: 20px;
      padding: 13px 15px;
      outline: none;
      border: 0;
      font-size: 16px;
    }

    .el-icon-search {
      cursor: pointer;
      font-size: 22px;
      padding: 0 10px;
      font-weight: bold;
    }
  }
}
</style>