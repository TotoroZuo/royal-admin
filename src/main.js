import Vue from 'vue'
import App from './App.vue'
import router from './router/'
import store from './store/default/'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import apis from '@/apis/'

Vue.use(apis) // 安装接口

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
