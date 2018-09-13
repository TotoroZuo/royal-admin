/*
 * @Author: Long maomao
 * @Date: 2018-09-10 13:17:32
 * @LastEditors: Long maomao
 * @LastEditTime: 2018-09-10 17:00:18
 * @Email: zlf@zuolongfei.me
 *
 * @Description: 用户状态管理
 *
 */

export default {
  namespaced: true,
  state: {
    // 用户信息
    info: {},
    // 用户token 或者id
    token: ''
  },
  mutations: {
    /**
     * @description 设置用户数据
     * @param {Object} state vuex state
     * @param {*} info info
     */
    set (state, info) {
      // store 赋值
      state.info = info
      state.token = info.token
      sessionStorage.setItem('token', info.token)
      sessionStorage.setItem('userInfo', JSON.stringify(info))
      console.log(state.info)
    },
    /**
     * [clear description] 退出登陆清除用户信息
     */
    clear (state) {
      state.token = ''
      state.info = {}
      sessionStorage.setItem('token')
      sessionStorage.setItem('userInfo')
    }

  }
}
