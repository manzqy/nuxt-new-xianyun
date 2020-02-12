<template>
  <div class="container-fluid">
    <div class="container">
      <el-row type="flex" align="middle">
        <el-col :span="4" class="logo">
          <img src="http://157.122.54.189:9093/images/logo.jpg" alt="">
        </el-col>
        
        <el-col :span="12">
          <el-row type="flex" align="middle" class="nav">
            <nuxt-link to="/">首页</nuxt-link>
            <nuxt-link to="/post">旅游攻略</nuxt-link>
            <nuxt-link to="/hotel">酒店</nuxt-link>
            <nuxt-link to="/air">国内机票</nuxt-link>
          </el-row>
        </el-col>

        <el-col :span="8">
          <el-row type="flex" justify="end" align="middle">
            <el-col :span="6">
              <el-dropdown>
                <span class="el-dropdown-link addCursor">
                  <i class="el-icon-bell"></i>
                  <span>消息</span>
                  <i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>消息</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>

            <el-col :span="12" class="setfont">
              <el-dropdown type="flex" align="middle" v-if="userInfo.token" @command="exitLogin">
                <span class="el-dropdown-link userInfo">
                  <img :src="`${$axios.defaults.baseURL}${userInfo.user.defaultAvatar}`" alt="">
                  <span>{{ userInfo.user.nickname}}</span>
                  <i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="a">个人信息</el-dropdown-item>
                  <el-dropdown-item command="b">退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <nuxt-link class="register" to="/user/login" v-else>登录 / 注册</nuxt-link>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo || { token: '', user: {}}
    }
  },
  methods: {
    exitLogin(command) {
      if (command === 'b') {
        this.$store.commit('user/clearUserInfo')
        this.$message({
            message: "退出成功",
            type: "success"
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.container-fluid {
  box-shadow: 0 1px 4px rgba(0,0,0,0.3);
}
.container {
  width: 1000px;
  height: 60px;
  min-width: 1000px;
  margin: 0 auto;
}
.logo {
  img {
    width: 156px;
    height: 43px;
  }
}
.addCursor,.userInfo {
  cursor: pointer;
}
.nav {
  height: 60px;
  a {
    box-sizing: border-box;
    padding: 0 20px;
    height: 100%;
    line-height: 60px;
    &:hover {
      color: #409eff;
      border-bottom: 5px solid #409eff;
    }
  }
}
/deep/.nuxt-link-exact-active {
      background-color: #409eff;
      color: #fff;
      &:hover {
        color: #fff!important;
      }
    }
.userInfo {
  position: relative;
  top: 3px;
  img {
    display: inline-block;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    vertical-align: middle;
  }
}
.setfont {
  font-size: 14px;
  color: #606266;
}
.register {
  &:hover {
    text-decoration: underline;
    color: #007acc;
  }
}
</style>