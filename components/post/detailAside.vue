<template>
  <div class="detail-aside">
    <h4>相关攻略</h4>
    <div class="recommend-list">
      <nuxt-link 
        class="recommend-item" 
        :to="`/post/detail?id=${item.id}`" 
        v-for="(item, index) in asideData"
        :key="index"
      >
        <h5>{{item.title}}</h5>
        <p> {{item.created_at | dateForm}}<span>阅读 - {{item.watch || Math.floor(Math.random()*100)}}</span></p>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      asideData: {}
    }
  },
  mounted () {
    const {id} = this.$route.query
    this.$axios({
      url: '/posts/recommend',
      params: {
        id
      }
    }).then(({data}) => {
      console.log(data)
      this.asideData = data.data
    })
  },
  filters: {
    dateForm(time) {
      return moment(new Date(time)).format('YYYY-MM-DD HH:MM')
    }
  }
}
</script>

<style lang="less" scoped>
.detail-aside {
  padding-left: 25px;
  h4 {
    font-weight: 400;
    font-size: 18px;
    padding-bottom: 10px;
    border-bottom: 1px dashed #ddd;
  }
  .recommend-item {
    display: block;
    padding: 20px 0;
    border-bottom: 1px dashed green;
    h5 {
      padding-bottom: 15px;
      font-size: 17px;
      font-weight: 400;
    }
    p {
      font-size: 12px;
      color: #999;
      span {
        padding-left: 15px;
        color: orange;
      }
    }
  }
}
</style>