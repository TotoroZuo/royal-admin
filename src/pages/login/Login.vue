<template>
  <div class="login-container">
    <div class="login-main">
      <transition name="slogan">
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
                        <div class="login-msg" v-show="errMsg">
                           <i class="el-icon-error"></i> {{errMsg}}
                        </div>
                        <el-button type="primary"  style="width:100%;" :disabled="inputFull" @click="doLogin">登陆</el-button>

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
      password: '',
      errMsg: ''
    }
  },
  mounted () {
    setTimeout(() => {
      this.showSlogan = true
      this.showPaper = true
    }, 100)
  },
  methods: {
    changeLoginType (tab, event) {
      this.activeLoginType = tab.name
    },
    doLogin () {
      this.errMsg = ''
      const params = {
        userName: this.username.replace(/\s+/g, ''),
        password: this.password.replace(/\s+/g, '')
      }
      this.$apis.user.doLogin(params).then((res) => {
        if (res.code !== 200) {
          this.errMsg = res.msg
        }
        this.$store.commit('user/set', res.data)
        this.$message({
          message: '恭喜你，登陆成功',
          type: 'success',
          duration: 1000,
          onClose: () => {
            this.$router.push({ name: 'index' })
          }
        })
      })
    }
  },
  computed: {
    inputFull () {
      if (!this.username.replace(/\s+/g, '') || !this.password.replace(/\s+/g, '')) {
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
