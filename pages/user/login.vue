<template>
  <div class="login">
    <el-row
      class="container"
      type="flex"
      justify="center"
      align="middle"
    >
      <div class="formData">
        <el-row
          class="tabs"
          type="flex"
          justify="space-evently"
          align="middle"
        >
          <el-col :span="24 / tabData.length" v-for="(item, index) in tabData" :key="item">
            <span :class="{active: index === currentIndex}" @click="handleIndex(index)">{{item}}</span>
          </el-col>
        </el-row>
        <div class="tabList">
          <!-- 登录 -->
          <LoginForm v-if="currentIndex === 0"/>
          <!-- 注册 -->
          <Register v-if="currentIndex === 1"></Register>
        </div>
      </div>
    </el-row>

  </div>
</template>

<script>
import LoginForm from '@/components/user/loginForm'
import Register from '@/components/user/register'
export default {
  components: {
    LoginForm,
    Register
  },
  data() {
    return {
      currentIndex: 0,
      tabData: ['登录', '注册']
    }
  },
  methods: {
    handleIndex(index) {
      this.currentIndex = index
      console.log(this.currentIndex)
    }
  }
}
</script>

<style lang="less" scoped>
  .login {
    min-width: 1000px;
    height: 700px;
    background: url(http://157.122.54.189:9095/assets/images/th01.jfif) no-repeat center;
    background-size: cover;
  }
  .container {
    height: 100%;
    width: 1000px;
    margin: 0 auto;
  }
  .formData {
    background-color: #fff;
    .tabs {
      width: 400px;
      span {
        box-sizing: border-box;
        display: block;
        width: 100%;
        height: 50px;
        text-align: center;
        line-height: 50px;
        color: #666;
        background-color: #eeeeee;
        cursor: pointer;
      }
      .active {
          font-weight: 700;
          color: #ffa500;
          background-color: #fff;
          border-top: 2px solid #ffa500;
        }
    }
  }
  .tabList {
    padding: 25px;
    padding-bottom: 0;
  }
</style>