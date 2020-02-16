<template>
  <div class="post">
    <el-row>
      <el-col :span="7">
        <div class="post-aside">111</div>
      </el-col>
      <el-col :span="17">
        <div class="post-search">
          <el-input 
            placeholder="请输入想去的地方，比如 '广州'" 
            v-model="input3" class="input-with-select" 
            @change="searchArticleList"
          >
            <i
              class="el-icon-search el-input__icon post-icon"
              slot="suffix"
            >
            </i>
          </el-input>
          <div class="post-recommend">
            推荐：&nbsp;
            <span v-for="(item,index) in recommendList" :key="index" @click="addCityName(item)">
              {{item}}
            </span>
          </div>
          <div class="post-raiders">
            <el-row type="flex" justify="space-between" align="middle">
              <h3>推荐攻略</h3>
              <el-button type="primary" icon="el-icon-edit" @click="toWriteArticle">写游记</el-button>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  data () {
    return {
      input3: '',
      recommendList: ['广州', '上海', '北京']
    }
  },
  methods: {
    toWriteArticle() {
      this.$router.push({
        path: '/post/create'
      })
    },
    addCityName(data) {
      this.input3 = data
      this.searchArticleList()
    },
    searchArticleList() {
      console.log(this.input3)
      if (!this.input3) {
        this.$message.error('输入城市不能为空')
        return
      }
      this.$axios({
        url: '/posts',
        params: {
          city: this.input3
        }
      }).then((res) => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.post {
  width: 1000px;
  min-width: 1000px;
  padding: 20px 0;
  margin: 0 auto;
}
.post-icon {
  font-size: 22px;
  color: orange;
}
/deep/ .el-input__inner {
  border: 3px solid orange;
  color: #7575a1;
  font-size: 14px;
}
.post-recommend {
  padding: 10px 0;
  font-size: 12px;
  color: #666;
  span {
    margin-right: 5px;
    &:hover {
      color: orange;
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
.post-raiders {
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  h3 {
    color: orange;
    font-size: 18px;
    font-weight: 400;
    &::after {
      content: "";
      display: block;
      width: 72px;
      height: 2px;
      background: orange;
      position: absolute;
      bottom: -11px;
      left: 0;
    }
  }
}
</style>