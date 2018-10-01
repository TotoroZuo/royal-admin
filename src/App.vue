<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  mounted () {
    // 解决用户登陆持久化问题
    const token = sessionStorage.getItem('token')
    if (!this.$store.state.user.token && token) {
      this.$store.commit('user/refresh')
    }
    // 获取浏览器信息
    this.$store.commit('ua/get')
  }
}
</script>

<style lang="stylus">
    @import './styles/normalize.styl'
    @import './styles/common.styl'
</style>
