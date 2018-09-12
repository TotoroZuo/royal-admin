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
      // state.info = info
      // // 持久化
      // this.dispatch('d2admin/db/set', {
      //   dbName: 'sys',
      //   path: 'user.info',
      //   value: info,
      //   user: true
      // })
    },
    /**
     * [clear description] 退出登陆清除用户信息
     */
    clear (state) {
      state.token = ''
      state.info = {}
    }

  },
  actions: {
    /**
     * [login description] 退出登陆清除用户信息
     * @param  {String} username
     * @param  {String} password
     * @return {Object} 用户信息
     */

    login ({ state, commit }, params) {
      console.log(this)
    },
    /**
     *
     *
     * @param {*} { state, commit }
     */
    logout ({ state, commit }) {
      // 调用退出登陆接口
      // 清空本地用户信息
      commit('clear')
    }
  }
}
