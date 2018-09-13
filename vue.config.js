module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? '/' : '/',
  devServer: {
    proxy: 'http://yapi.demo.qunar.com/mock/18784'
  }
}
