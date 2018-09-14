<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  mounted () {
    this.refreshToken()
  },
  methods: {
    refreshToken () {
      // 解决用户登陆持久化问题
      const token = sessionStorage.getItem('token')
      if (!this.$store.state.user.token && token) {
        this.$store.commit('user/refresh')
      }
    }
  }
}
</script>

<style lang="stylus">
    @import './styles/normalize.styl'
    @import './styles/common.styl'
</style>
