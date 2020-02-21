<template>
  <div class="post-detail">
    <el-row>
      <el-col :span="17" class="detail-content">
        <!-- 面包屑导航 -->
        <!-- 测试一下 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/post' }">旅游攻略</el-breadcrumb-item>
          <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
        </el-breadcrumb>
        <h1>{{detailData.title}}</h1>
        <div class="post-info">
          <span>
            攻略:
            <i>{{detailData.city.created_at}}</i>
          </span>
          <span>
            阅读:
            <i>{{detailData.watch || Math.floor(Math.random()*100)}}</i>
          </span>
        </div>
        <div class="detail-text" v-html="detailData.content"></div>
        <el-row class="post-ctrl">
          <el-col :span="12" class="post-crtl-item">
            <i class="iconfont iconpinglun"></i>
          </el-col>
          <el-col :span="12" class="post-crtl-item">
            <i class="iconfont iconfenxiang" @click="shareUser"></i>
          </el-col>
          <el-col :span="12" class="post-crtl-item">
            评论:(
            <strong>{{total}}</strong>
            )
          </el-col>
          <el-col :span="12" class="post-crtl-item" @click="shareUser">分享</el-col>
        </el-row>
        <div class="cmt-wrappr">
          <h4>评论</h4>
          <el-tag type="info" closable class="replyTag" v-if="isTagShow" @close="closeTag">回复：@{{nickname}}</el-tag>
          <el-input type="textarea" ref="detailText" placeholder="说点什么吧..." v-model="textareaInput" resize="none"></el-input>
          <el-row class="comment-submit">
            <el-col :span="16">
              <el-upload
                :action="`${$axios.defaults.baseURL}/upload`"
                list-type="picture-card"
                name="files"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success="fileUploadSuccess"
                :file-list="fileList"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt />
              </el-dialog>
            </el-col>
            <el-col :span="8" style="text-align:right;">
              <el-button type="primary" size="mini" @click="submitComment">提交</el-button>
            </el-col>
          </el-row>
          <!-- 评论组件 -->
          <DetailComment 
            @recUserId="recUserId" 
            :isUpdate="isUpdate" 
            @closeUpdate="closeUpdate"
            @commentTotal="commentTotal"
          />
        </div>
      </el-col>
      <el-col :span="7">
        <DetailAside />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import DetailAside from '@/components/post/detailAside'
import DetailComment from '@/components/post/detailComment'
export default {
  components: {
    DetailAside,
    DetailComment
  },
  data() {
    return {
      detailData: {
        city: {}
      },
      dialogImageUrl: '',
      dialogVisible: false,
      textareaInput: '',
      isTagShow: false,
      pics: [],
      follow: '',
      isUpdate: false,
      fileList: [],
      nickname: '',
      total: ''
    }
  },
  mounted() {
    this.detailDateRequest()
  },
  methods: {
    detailDateRequest() {
      this.$axios({
        url: '/posts',
        params: {
          id: this.$route.query.id
        }
      }).then(({ data }) => {
        this.detailData = data.data[0]
      })
    },
    shareUser() {
      this.$message.warning('暂时不支持分享')
    },
    handleRemove(file, fileList) {
    },
    handlePictureCardPreview(files) {
      // this.dialogImageUrl = files.url
      // this.dialogVisible = true
    },
    fileUploadSuccess(response, file, fileList) {
      this.pics = [...this.pics, ...response]
    },
    closeTag() {
      this.isTagShow = false
      this.follow = null
    },
    closeUpdate(data) {
      this.isUpdate = data
    },
    commentTotal(data) {
      this.total = data
    },
    recUserId(data) {
      console.log(data)
      this.isTagShow = true
      this.follow = data.id
      this.nickname = data.nickname
      this.$refs.detailText.focus()
      const cmt = this.$el.querySelector('.cmt-wrappr')
      this.$nextTick(() => {
        document.querySelector('html').scrollTop = cmt.offsetTop
      })
    },
    submitComment() {
      if (!this.textareaInput && !this.pics.length) {
        this.$message.error('输入内容不能为空')
        return
      }
      const data = {
        post: +this.$route.query.id,
        content: this.textareaInput,
        pics: this.pics
      }
      if (this.follow) {
        data.follow = this.follow
      }
      this.$axios({
        url: '/comments',
        method: 'POST',
        data,
        headers: {
          Authorization : 'Bearer ' + this.$store.state.user.userInfo.token
        }
      }).then(({data}) => {
        this.isTagShow = false
        this.isUpdate = true
        this.textareaInput = ''
        this.pics = []
        this.follow = null
        this.fileList = []
      })
    }
  },
  beforeRouteUpdate(to, from, next) {
    next()
    this.detailDateRequest()
    this.isUpdate = true
  }
}
</script>

<style lang="less" scoped>
.post-detail {
  width: 1000px;
  min-width: 1000px;
  margin: 0 auto;
  padding-top: 20px;
}
.detail-content {
  h1 {
    padding: 20px 0 30px 0;
    border-bottom: 1px dashed #ddd;
  }
}
.post-info {
  color: #999;
  padding: 20px;
  text-align: right;
  span {
    margin-left: 20px;
    i {
      color: orange;
    }
  }
}
.detail-text {
  /deep/p {
    text-indent: 2em;
    line-height: 25px;
    padding: 10px 0;
    span {
      display: block;
      margin: 10px 0;
    }
  }
  /deep/img {
    display: block;
    width: 100%;
  }
}
.post-ctrl {
  text-align: center;
  padding: 35px;
  color: #666;
  cursor: pointer;
  i {
    display: block;
    font-size: 28px;
    color: orange;
    padding-bottom: 10px;
  }
  strong {
    font-weight: 400;
    color: orange;
  }
}
.cmt-wrappr {
  margin-bottom: 20px;
  h4 {
    font-weight: 400;
    font-size: 18px;
    margin-bottom: 20px;
  }
}
.comment-submit {
  padding: 10px 0 20px;
}
.replyTag {
  margin-bottom: 10px;
}
</style>