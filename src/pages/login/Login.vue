<template>
  <div class="login-container">
    <div class="login-main">
      <transition name="slogan">
  <!-- ... the buttons ... -->
        <div class="login-slogan" v-if="showSlogan">
          <img src="../../assets/slogan.png" alt="less coding , better life" width="100%">
        </div>
      </transition>
      <transition name="loginform">
        <div class="login-paper login-form-box" v-if="showPaper">
            <div class="brand-log">
              <img src="../../assets/brand-logo.png" alt="胖龙猫">
            </div>
            <el-tabs v-model="activeLoginType" @tab-click="changeLoginType" stretch>
                <el-tab-pane label="账号登陆" name="password">
                    <div class="login-form-inputs">
                        <el-input
                          placeholder="请输入账号"
                          prefix-icon="el-icon-mobile-phone"
                          class="login-input"
                          v-model="username">
                        </el-input>
                        <el-input
                          placeholder="请输入密码"

                          type="password"
                          prefix-icon="el-icon-goods"
                          class="login-input"
                          v-model="password">
                        </el-input>
                        <el-button type="primary"  style="width:100%;margin: 10px 0;" :disabled="inputFull" @click="doLogin">登陆</el-button>
                    </div>
                    <div class="signup-link-box">
                      <el-button type="text" class="signup-link">账号注册</el-button>
                      <el-button type="text" class="forgot-link">忘记密码</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="扫码登陆" name="qrcode" >
                  <div class="qr-content">
                    <img src="../../assets/qr.png" class="qr-img" alt="">
                  </div>
                  <div class="qr-tip">
                    请使用微信扫一扫，扫码登陆
                  </div>
                </el-tab-pane>

            </el-tabs>
        </div>
      </transition>
    </div>

    <div class="login-footer">© {{curYear}} <a href="https://github.com/TotoroZuo/royal-admin">{{copyRight}}</a> </div>
  </div>
</template>
<script>
import setting from '@/config.js'
const thisYear = new Date().getFullYear()
export default {
  name: 'login',
  data () {
    return {
      copyRight: setting.copyRight,
      curYear: thisYear,
      showSlogan: false,
      showPaper: false,
      activeLoginType: 'password', // 登陆方式
      username: '',
      password: ''
    }
  },
  mounted () {
    setTimeout(() => {
      this.showSlogan = true
      this.showPaper = true
    }, 100)
    console.log(this.$store.state.user)
  },
  methods: {
    changeLoginType (tab, event) {
      console.log(tab)
      this.activeLoginType = tab.name
    },
    doLogin () {
      const params = { userName: this.username, password: this.password }
      this.$apis.user.doLogin(params).then((res) => {
        this.$store.commit('user/set', res.data)
      })
    //   this.$store.commit('user/set',userInfo)
    }
  },
  computed: {
    inputFull () {
      if (!this.username || !this.password) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import './login.styl'
</style>
<style lang="stylus">
.el-input__inner
  border-radius 2px
  &::placeholder
    font-weight 200
    font-size 13px
.el-button
  border-radius 2px
</style>
