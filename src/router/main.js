
// layout 布局入口,如有需要请手动切换
import layoutIntrance from '@/layout/sideOuter'
/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' },
    component: layoutIntrance,
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/main/Home.vue')
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('@/views/main/About.vue')
      }
    ]
  }
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登陆
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Login.vue')
  }
]

/**
 * 错误页面
 */
const errorPage = [
  // 404
  {
    path: '*',
    name: '404',
    component: () => import('@/views/error/404.vue')
  }
]

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
