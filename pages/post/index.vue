<template>
  <div class="post">
    <el-row>
      <el-col :span="7">
        <div class="post-aside">
          <TourAside @gainCityName="gainCityName" />
        </div>
      </el-col>
      <el-col :span="17" class="post-main">
        <div class="post-search">
          <el-input
            placeholder="请输入想去的地方，比如 '广州'"
            v-model="input3"
            class="input-with-select"
            @change="searchArticleList"
          >
            <i
              class="el-icon-search el-input__icon post-icon"
              slot="suffix"
              @click="searchArticleListInput"
            ></i>
          </el-input>
          <div class="post-recommend">
            推荐：&nbsp;
            <span
              v-for="(item,index) in recommendList"
              :key="index"
              @click="addCityName(item)"
            >{{item}}</span>
          </div>
          <div class="post-raiders">
            <el-row type="flex" justify="space-between" align="middle">
              <h3>推荐攻略</h3>
              <el-button type="primary" icon="el-icon-edit" @click="toWriteArticle">写游记</el-button>
            </el-row>
          </div>
        </div>
        <ArticleDetails 
        v-for="(item,index) in articleList" :key="item.id+index" 
        :cardContent="item">
        </ArticleDetails>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="start / limit +1"
          :page-sizes="[3,5,10,15]"
          :page-size="limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TourAside from '@/components/post/tourAside'
import ArticleDetails from '@/components/post/articleDetails'
export default {
  components: {
    TourAside,
    ArticleDetails
  },
  data() {
    return {
      input3: '',
      recommendList: ['广州', '上海', '北京'],
      articleList: [],
      start: 0,
      limit:5,
      total: 0
    }
  },
  methods: {
    toWriteArticle() {
      this.$router.push({
        path: '/post/create'
      })
    },
    searchArticleList() {
      if(this.input3){
        params.city=this.input3
      }
      this.$axios({
        url: '/posts',
        params: {
          _start: this.start, // 从哪一条数据开始
          _limit: this.limit // 拿多少条数据
        }
      }).then(res=> {
        const { data,total }=res.data;
        this.articleList=data;
        this.total=total;
      })
    },
    handleSizeChange(data) {
      this.pagesizes = data
      this.searchArticleList()
    },
    handleCurrentChange(index) {
      this.start=(index-1)*this.limit;
      this.$router.replace({
        url:this.$route.path,
        query:{
          start:this.st
        }
      })
    },
    
    gainCityName(data) {
      this.input3 = data
      this.currentIndex = 1
      this.searchArticleList()
    },
    searchArticleListInput() {
      this.currentIndex = 1
      this.searchArticleList()
    },
    
  },
  mounted() {
    this.searchArticleList()
  },
  beforeRouteUpdate(to, form, next) {
    next()
    this.currentIndex = 1
    this.input3 = ''
    this.searchArticleList()
    console.log(to)
  }
}
</script>

<style lang="less" scoped>
.post {
  width: 1000px;
  padding: 20px 0;
  margin: 0 auto;
}
.post-main {
  padding-left: 9px;
}
.post-icon {
  position: relative;
  left: -6px;
  font-size: 22px;
  color: orange;
}
/deep/.el-input__inner {
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
      content: '';
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