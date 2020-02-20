<template>
  <div class="cmt-list">
    <div class="cmt-item" v-for="(item) in dataMap" :key="item.id">
      <div class="cmt-info">
        <img :src="`${$axios.defaults.baseURL}${item.account && item.account.defaultAvatar}`" alt />
        <i>{{item.account.nickname}}</i>
        <i>{{item.created_at | dateForm}}</i>
        <span>{{item.level}}</span>
      </div>
      <CommentItem v-if="item.parent" :data="item.parent" @recUserId="recUserId"/>
      <div class="cmt-content">
        <div class="cmt-new">
          <p class="cmt-message">{{item.content}}</p>
          <el-row type="flex">
            <div class="cmt-pic" 
              v-for="item1 in item.pics"
              :key="item1.id"
            >
              <img
                :src="`${$axios.defaults.baseURL}${item1.url}`"
                alt
              />
            </div>
          </el-row>
          <div class="cmt-ctrl">
            <strong @click="replyUser(item.id, item.account.nickname)">回复</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'CommentItem',
  props: ['data'],
  filters: {
    dateForm(time) {
      return moment(new Date(time)).format('YYYY-MM-DD HH:MM')
    }
  },
  computed: {
    dataMap() {
      if (this.data.length) {
        return this.data
      } else {
        return [this.data]
      }
    }
  },
  methods: {
    replyUser(id, nickname) {
      this.$emit('recUserId', {
        id,
        nickname
      })
    },
    recUserId(data) {
      this.$emit('recUserId', data)
    }
  }
}
</script>

<style lang="less" scoped>
.cmt-list {
  border: 1px solid #ddd;
  border-bottom: none;
  // margin: 5px 0;
  .cmt-item {
    border-bottom: 1px dashed green;
    padding: 20px 20px 5px;
    &:hover strong {
    display: block !important;
    color: orange;
  }
  }
  &:last-child {
    border-bottom: none;
  }
}
.cmt-info {
  margin-bottom: 10px;
  font-size: 12px;
  color: #666;
  vertical-align: top;
  img {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    vertical-align: top;
  }
  i {
    color: #999;
  }
  span {
    float: right;
  }
}
.cmt-content {
  padding: 0 0 0 30px;
  .cmt-message {
    margin-top: 10px;
  }
  .cmt-pic {
    width: 80px;
    height: 80px;
    border-radius: 6px;
    overflow: hidden;
    margin-right: 5px;
    margin-top: 10px;
    padding: 5px;
    border: 1px dashed #ddd;
    img {
      display: block;
      width: 100%;
      height: 100%;
      -o-object-fit: cover;
      object-fit: cover;
      cursor: pointer;
    }
  }
  .cmt-ctrl {
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    color: #1e50a2;
    text-align: right;
    strong {
      display: none;
      font-weight: 400;
      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
}
</style>