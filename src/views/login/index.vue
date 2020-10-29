<template>
  <div class="login-container">
    <div class="layer">
      <div class="some-space">
        <div v-if="show" class="form">
          <h2>{{ title }}</h2>
          <!-- <div class="item">
            <div class="radio-group">
              <div class="radio-btn" :class="{ active: tab == 'login' }" @click="tab = 'login'">
                登录
              </div>
              <div class="radio-btn" :class="{ active: tab == 'reg' }" @click="tab = 'reg'">注册</div>
            </div>
          </div> -->
          <el-tabs
            v-model="activeTab"
            tab-position="left"
            style="height: 160px"
          >
            <el-tab-pane :name="tabs[0]" :label="tabs[0]">
              <div class="item">
                <i class="iconfont icon-user" />
                <input
                  v-model="username"
                  autocomplete="off"
                  type="text"
                  class="input"
                  placeholder="请输入用户名"
                >
              </div>
              <div class="item">
                <i class="iconfont icon-password" />
                <input
                  v-model="password"
                  autocomplete="off"
                  type="password"
                  class="input"
                  maxlength="20"
                  placeholder="请输入密码"
                  @keyup.enter="login"
                >
              </div>
            </el-tab-pane>
            <el-tab-pane :name="tabs[1]" :label="tabs[1]">
              <div class="item">
                <i class="iconfont icon-user" />
                <input
                  v-model="username"
                  autocomplete="off"
                  type="text"
                  class="input"
                  placeholder="请输入用户名"
                >
              </div>
              <div class="item">
                <i class="iconfont icon-password" />
                <input
                  v-model="password"
                  autocomplete="off"
                  type="password"
                  class="input"
                  maxlength="20"
                  placeholder="请输入密码"
                  @keyup.enter="login"
                >
              </div>
            </el-tab-pane>
          </el-tabs>

          <button
            v-if="activeTab === '登录'"
            class="loginBtn"
            :disabled="isLoginAble"
            @click.stop="login"
          >
            立即登录
          </button>
          <button
            v-if="activeTab === '注册'"
            class="loginBtn"
            :disabled="isLoginAble"
            @click.stop="register"
          >
            立即注册
          </button>
          <!-- <div class="tip">默认用户名：admin ，默认密码：123456</div> -->
          <div class="tip">注册用户，注册成功后，自动登录</div>
        </div>
        <div v-if="!show" class="btn-wrapper">
          <button class="light-btn" @click="handleClick">进入平台</button>
        </div>
      </div>
    </div>

    <vue-particles
      color="#6495ED"
      :particle-opacity="0.7"
      :particles-number="80"
      shape-type="circle"
      :particle-size="4"
      lines-color="#6495ED"
      :lines-width="1"
      :line-linked="true"
      :line-opacity="0.6"
      :lines-distance="150"
      :move-speed="3"
      :hover-effect="true"
      hover-mode="grab"
      :click-effect="true"
      click-mode="push"
    />

    <bg-animation />
  </div>
</template>

<script>
import BgAnimation from '@/zph-components/bgAnimation'
import { SYSTEM_TITLE_ZHCN } from '@/constant/system'
import md5 from 'js-md5'
import { login, register } from '@/api/user'

export default {
  name: 'Login',
  components: {
    BgAnimation
  },
  data() {
    return {
      title: SYSTEM_TITLE_ZHCN,
      show: false,
      username: 'admin',
      password: '123456',
      tabs: ['登录', '注册'],
      activeTab: '登录'
    }
  },
  computed: {
    isLoginAble() {
      return !(this.username && this.password)
    }
  },
  created() {},
  mounted() {
    // this.visible = true
  },
  methods: {
    handleClick() {
      this.show = true
    },
    login() {
      // 开始检查
      const md5pass = md5(this.password) // 对密码进行MD5加密
      login({
        username: this.username,
        password: md5pass
      }).then((result) => {
        const { errno, errmsg, data } = result
        if (errno === 0) {
          this.handleSuccessResult(data)
        } else {
          this.$message.error(errmsg || '请输入正确的用户名和密码')
        }
      })
    },
    register() {
      // 开始检查
      const md5pass = md5(this.password) // 对密码进行MD5加密
      register({
        username: this.username,
        password: md5pass
      }).then((result) => {
        const { errno, errmsg, data } = result
        if (errno === 0) {
          this.handleSuccessResult(data)
        } else {
          this.$message.error(errmsg || '注册失败')
        }
      })
    },
    handleSuccessResult(data) {
      this.$message({
        type: 'success',
        message: '验证成功'
      })
      localStorage.setItem('uid', data.uid)
      localStorage.setItem('user', data.name)
      this.$router.push({
        path: '/home'
      })
      this.loading = true
      const md5pass = md5(this.password) // 对密码进行MD5加密
      this.$store
        .dispatch('user/login', {
          username: this.username,
          password: md5pass
        })
        .then(() => {
          this.$router.push({ path: this.redirect || '/' })
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-tabs__header {
  margin-left: -36px;
}
::v-deep .el-tabs__nav {
  height: 100%;
}
::v-deep .el-tabs__item {
  writing-mode: vertical-lr;
  height: 50%;
  text-align: center !important;
  padding: 0;
  font-size: 15px;
  color: #d3d7f7;
}

::v-deep .el-tabs__item.is-active {
  color: #409eff;
}
::v-deep .el-tabs__active-bar {
  height: 50% !important;
}
::v-deep .el-tabs--left,
.el-tabs--right {
  overflow: inherit;
}

.login-container {
  .layer {
    position: absolute;
    height: 100%;
    width: 100%;
  }
  #particles-js {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    overflow: hidden;
  }
  .some-space {
    color: white;
    font-weight: 100;
    letter-spacing: 2px;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1001;
    -webkit-transform: translate3d(-50%, -50%, 0);
    transform: translate3d(-50%, -50%, 0);

    -ms-animation: cloud 2s 3s ease-in infinite alternate;
    -moz-animation: cloud 2s 3s ease-in infinite alternate;
    -webkit-animation: cloud 2s 3s ease-in infinite alternate;
    -o-animation: cloud 2s 3s ease-in infinite alternate;
    -webkit-animation: cloud 2s 3s ease-in infinite alternate;
    animation: cloud 2s 3s ease-in infinite alternate;

    .form {
      width: 460px;
      height: auto;
      background: rgba(36, 36, 85, 0.5);
      margin: 0 auto;
      padding: 35px 30px 25px;
      box-shadow: 0 0 25px rgba(255, 255, 255, 0.5);
      border-radius: 10px;
      .item {
        display: flex;
        align-items: center;
        margin-bottom: 25px;
        border-bottom: 1px solid #d3d7f7;
        i {
          color: #d3d7f7;
          margin-right: 10px;
        }
      }
      h2 {
        text-align: center;
        font-weight: normal;
        font-size: 26px;
        color: #d3d7f7;
        padding-bottom: 35px;
      }
      .input {
        font-size: 16px;
        line-height: 30px;
        width: 100%;
        color: #d3d7f7;
        outline: none;
        border: none;
        background-color: rgba(0, 0, 0, 0);
        padding: 10px 0;
      }
      .loginBtn {
        width: 100%;
        padding: 12px 0;
        border: 1px solid #d3d7f7;
        font-size: 16px;
        color: #d3d7f7;
        cursor: pointer;
        background: transparent;
        border-radius: 4px;
        margin-top: 10px;
        &:hover {
          color: #fff;
          background: #0090ff;
          border-color: #0090ff;
        }
      }
      .tip {
        font-size: 12px;
        padding-top: 20px;
      }
    }
  }
}

input::-webkit-input-placeholder {
  color: #d3d7f7;
}
input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #d3d7f7;
}
input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #d3d7f7;
}
input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #d3d7f7;
}

@-ms-keyframes cloud {
  0% {
    -ms-transform: translate(-50%, -50%);
  }
  40% {
    opacity: 1;
  }
  60% {
    opacity: 1;
  }
  100% {
    -ms-transform: translate(-50%, -40%);
  }
}
@-moz-keyframes cloud {
  0% {
    -moz-transform: translate(-50%, -50%);
  }
  40% {
    opacity: 1;
  }
  60% {
    opacity: 1;
  }
  100% {
    -moz-transform: translate(-50%, -40%);
  }
}
@-o-keyframes cloud {
  0% {
    -o-transform: translate(-50%, -50%);
  }
  40% {
    opacity: 1;
  }
  60% {
    opacity: 1;
  }
  100% {
    -o-transform: translate(-50%, -40%);
  }
}
@-webkit-keyframes cloud {
  0% {
    -webkit-transform: translate(-50%, -50%);
  }
  40% {
    opacity: 1;
  }
  60% {
    opacity: 1;
  }
  100% {
    -webkit-transform: translate(-50%, -40%);
  }
}
@keyframes cloud {
  0% {
    transform: translate(-50%, -50%);
  }
  40% {
    opacity: 1;
  }
  60% {
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -40%);
  }
}

/* 高亮按钮 */
.light-btn {
  text-decoration: none;
  position: absolute;
  left: 50%;
  top: 80%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
  background-size: 400%;
  width: 400px;
  height: 100px;
  line-height: 100px;
  color: #fff;
  text-align: center;
  text-transform: uppercase;
  border-radius: 50px;
  z-index: 1;
}

.light-btn:hover::before,
.light-btn:hover {
  animation: sun 2s linear infinite;
}

.light-btn::before {
  content: "";
  position: absolute;
  left: -5px;
  right: -5px;
  top: -5px;
  bottom: -5px;
  background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
  background-size: 400%;
  border-radius: 50px;
  filter: blur(10px);
  z-index: -1;
  animation: sun 12s linear infinite;
}

@keyframes sun {
  100% {
    background-position: -400% 0;
  }
}
</style>
