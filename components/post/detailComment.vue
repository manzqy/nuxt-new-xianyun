<template>
  <div class="cmt-empty" v-if="!commentData.length">
    暂无评论，赶紧抢占沙发！
  </div>
  <div v-else>
    <div class="cmt-container">
      <DetailCommentItem :data="commentData" @recUserId="recUserId"/>
    </div>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentIndex"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="+total">
    </el-pagination>
  </div>
</template>

<script>
import DetailCommentItem from './detailCommentItem'
export default {
  components: {
    DetailCommentItem
  },
  props: {
    isUpdate: {
      type: Boolean
    }
  },
  data () {
    return {
      commentData: [],
      currentIndex: 1,
      pageSize: 5,
      total: ''
    }
  },
  watch: {
    isUpdate(newValue, oldValue) {
      if (newValue) {
        this.currentIndex = 1
        this.getCommentData()
        this.$emit('closeUpdate', false)
      }
    }
  },
  mounted() {
    this.getCommentData()
  },
  methods: {
    getCommentData() {
      this.$axios({
        url: '/posts/comments',
        params: {
          post: this.$route.query.id,
          _start: this.currentIndex - 1,
          _limit: this.pageSize
        }
      }).then(({data}) => {
        this.commentData = data.data
        this.total = data.total
        this.$emit('commentTotal', this.total)
      })
    },
    handleSizeChange(data) {
      this.pageSize = data
      this.getCommentData()
    },
    handleCurrentChange(data) {
      this.currentIndex = data
      this.getCommentData()
    },
    recUserId(data) {
      this.$emit('recUserId', data)
    }
  }
}
</script>

<style lang="less" scoped>
.cmt-empty {
  color: #999;
  font-size: 14px;
  text-align: center;
  padding: 30px 0;
  border: 1px dashed #ddd;
}
.cmt-container {
  // border: 1px solid #ddd;
  margin-bottom: 15px;
}
</style>