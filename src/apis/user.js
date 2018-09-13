/*
 * @Author: Long maomao
 * @Date: 2018-09-10 19:08:45
 * @LastEditors: Long maomao
 * @LastEditTime: 2018-09-10 19:26:49
 * @Description: 用户模块接口
 * @Email: zlf@zuolongfei.me
 */

import $request from '@/libs/http.js' // 导入http请求方法

/**
 * @description 用户登录接口
 * @param  {String} options.userName 用户名
 * @param  {String} options.password 用户密码
 * @return {Object} 接口返回数据
 */
const doLogin = options => {
  const url = '/user/doLogin'
  const params = {
    account: options.userName,
    password: options.password
  }
  return $request.post(url, params)
}

/**
 * @description 用户退出登录接口
 */
const doLogout = options => {
  const url = '/doLogout'

  return $request.post(url, {})
}

export default {
  doLogin,
  doLogout
}
