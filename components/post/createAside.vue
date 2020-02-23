<template>
  <div class="create-aside">
    <h4>草稿箱 / <i>数量 ~ {{form.length}}</i></h4>
    <div 
      class="create-main" 
      v-for="(item,index) in form"
      :key="index"
      @click="sendDataToStore(index)"
    >
      <div>
        {{item.title}}
        <i class="iconfont el-icon-edit"></i>
      </div>
      <p>{{item.date}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      
    }
  },
  computed: {
    form() {
      return this.$store.state.post.formPublish
    },
  },
  methods: {
    sendDataToStore(index) {
      this.$store.commit('post/addListenData', {
        isListen: true,
        index
      })
    }
  }
}
</script>

<style lang="less" scoped>
.create-aside {
  margin-left: 20px;
  border: 1px solid #ddd;
  padding: 10px;
}
h4 {
    margin-bottom: 10px;
    font-weight: 400;
    color: #666;
    i {
      font-style: italic;
      font-size: 14px;
      color: orange;
    }
}
.create-main {
  margin-bottom: 10px;
  font-size: 14px;
  border-bottom: 1px dashed green;
  i {
    color: green;
    &:hover {
      color: orange;
    }
  }
  cursor: pointer;
  p {
    padding: 6px 0;
    color: orange;
    font-size: 12px;
  }
}
</style>