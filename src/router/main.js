
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
        meta: { title: 'index', name: '主页', icon: 'home', noCache: true },
        component: () => import('@/pages/main/Home.vue')
      },
      {
        path: 'about',
        name: 'about',
        meta: { title: 'about', name: '关于', icon: 'dashboard', noCache: true },
        component: () => import('@/pages/main/About.vue')
      }
    ]
  },
  {
    path: '/system',
    redirect: { name: 'users' },
    component: layoutIntrance,
    children: [
      {
        path: 'users',
        name: 'users',
        meta: { title: 'users', name: '用户列表', icon: 'group', noCache: true },
        component: () => import('@/pages/main/system/users/List.vue')
      },
      {
        path: 'roles',
        name: 'roles',
        meta: { title: 'roles', name: '角色管理', icon: 'group', noCache: true },
        component: () => import('@/pages/main/system/role/List.vue')
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
    meta: { title: 'login', name: '登陆', icon: 'home', noCache: true },
    component: () => import('@/pages/login/Login.vue')
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
    meta: { title: '404', name: '404', icon: 'error', noCache: true },
    component: () => import('@/pages/error/404.vue')
  }
]

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
