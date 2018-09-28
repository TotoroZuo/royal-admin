module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? '/' : '/',
  devServer: {
    proxy: 'http://yapi.demo.qunar.com/mock/18784'
  },
  configureWebpack: {
    externals: {
      vue: 'Vue',
      //   vuex: 'Vuex',
      'vue-router': 'VueRouter',
      'element-ui': 'ElementUI'
    }
  }
}
