import Vue from 'vue'
import App from './App.vue'
import router from './router/'
import store from './store/sideOuter/'

import apis from '@/apis/'

Vue.use(apis) // 安装接口

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
