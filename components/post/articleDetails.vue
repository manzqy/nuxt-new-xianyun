<template>
  <div class="article-item" v-if="cardContent.images.length>=3">
    <h4 @click="toPostDetail">{{cardContent.title}}</h4>
    <p class="post-desc" v-html="cardContent.summary" @click="toPostDetail"></p>
    <el-row class="post-info" @click="toPostDetail">
      <el-col :span="8" v-for="(item,index) in images" :key="index">
        <img :src="item || defaultImg" alt />
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-between" align="middle">
      <div class="article-user">
        <span>
          <i class="el-icon-location-outline"></i>
          {{cardContent.city.name}}
        </span>

        <div class="article-username" @click="toUserPersonal">
          <nuxt-link to="/user/personal">
            <img :src="`${$axios.defaults.baseURL}${cardContent.account.defaultAvatar}`" />
            {{cardContent.account.username}}
          </nuxt-link>
        </div>
        <span>
          <i class="el-icon-view"></i>
          {{cardContent.likeIds[0]}}
        </span>
      </div>
      <span class="post-info-right">78赞</span>
    </el-row>
  </div>
  <div class="article-item" v-else>
    <el-row type="flex" justify="space-between" align="middle">
      <div class="post-other" @click="toPostDetail">
        <img :src="images || defaultImg" />
      </div>
      <div class="post-right">
        <h4 @click="toPostDetail">{{cardContent.title}}</h4>
        <p class="post-desc" v-html="cardContent.summary" @click="toPostDetail"></p>
        <el-row type="flex" justify="space-between" align="middle">
          <div class="article-user">
            <span>
              <i class="el-icon-location-outline"></i>
              北京市
            </span>
            <div class="article-username" @click="toUserPersonal">
              <nuxt-link to="/user/personal">
                <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" />
                地球发动机
              </nuxt-link>
            </div>
            <span>
              <i class="el-icon-view"></i>
              13667
            </span>
          </div>
          <span class="post-info-right">78赞</span>
        </el-row>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    cardContent: {
      type: Object,
      default() {
        return {
          images: [],
          account: {},
          city: {},
          likeIds: []
        }
      }
    }
  },
  data() {
    return {
      defaultImg:
        'http://b1-q.mafengwo.net/s12/M00/F3/48/wKgED1uwnOuAU_FaAALtym3as2g88.jpeg?imageMogr2%2Fthumbnail%2F%21220x130r%2Fgravity%2FCenter%2Fcrop%2F%21220x130%2Fquality%2F100'
    }
  },
  mounted() {},
  computed: {
    images() {
      if (this.cardContent.images < 2) {
        return this.cardContent.images[0]
      }
      return this.cardContent.images.slice(0, 3)
      
    }
  },
  methods: {
    toUserPersonal() {
      this.$router.push({
        path: '/user/personal'
      })
    },
    toPostDetail() {
      this.$router.push({
        path: '/post/detail',
        query: {
          id: this.cardContent.id
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.post-right {
  width: 470px;
}
.article-item {
  width: 100%;
  padding: 20px 0;
  border-bottom: 1px solid #ddd;
  overflow: hidden;
  h4 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 15px;
    font-weight: 400;
    font-size: 18px;
    cursor: pointer;
    &:hover {
      position: relative;
      top: -2px;
      color: orange;
    }
  }
  .post-desc {
    width: 100%;
    margin-bottom: 15px;
    line-height: 1.5;
    font-size: 14px;
    height: 63px;
    overflow: hidden;
    color: #666;
    //   光标移入显示的是小手
    cursor: pointer;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    &:hover {
      color: green;
    }
  }
}

.post-info-right {
  color: orange;
}
.article-user {
  padding: 5px 0;
  font-size: 12px;
  color: #999;
  span {
    margin-right: 10px;
  }
  img {
    display: inline-block;
    position: relative;
    top: -2px;
    width: 16px;
    height: 16px;
    margin: 5px;
    border-radius: 100px;
    padding-left: 5px;
    vertical-align: middle;
  }
  .article-username {
    display: inline-block;
    margin-right: 10px;
    color: orange;
    cursor: pointer;
  }
  i {
    vertical-align: baseline;
  }
}
.post-info {
  margin: 15px 0;
  cursor: pointer;
}
img {
  width: 220px;
  height: 150px;
  display: block;
  -o-object-fit: cover;
  object-fit: cover;
  cursor: pointer;
}
.post-other {
  padding-right: 10px;
}
</style>