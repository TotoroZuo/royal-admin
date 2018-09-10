/*
 * @Author: Long maomao
 * @Date: 2018-09-10 14:17:54
 * @LastEditors: Long maomao
 * @LastEditTime: 2018-09-10 19:27:18
 * @Email: zlf@zuolongfei.me
 *
 *@Description: 网络请求封装
 *
 */
import axios from 'axios'
import qs from 'qs'
import jsonp from 'jsonp'
import store from '@/store/sideOuter/'

// axios 配置
axios.defaults.timeout = 5000
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

/**
 * [description] 请求拦截器
 */
axios.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
)

/**
* [description] 响应拦截器
*/

axios.interceptors.response.use(
  response => checkStatus(response),
  error => checkCode(Promise.resolve(error.response))
)

/**
 * [checkStatus description]    检测接口返回状态进行业务拦截
 * @description   状态码大于 200 小于 300
 * @param   { Object } response 响应返回数据
 * @return  {[type]}
 */
function checkStatus (response) {
  let data
  if (response.data === undefined) {
    // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
    data = response.request.responseText
  } else {
    data = response.data
  }
  //   根据返回的code值来做不同的处理（和后端约定）
  switch (data.code) {
    case '9000': // 登录过期
      store.commit('user/clear')
      break
    default:
  }

  return data
}

/**
 * [checkCode description]    检测接口返回错误状态进行业务拦截
 * @description   状态码大于300
 * @param   { Object } response 响应返回数据
 * @return  {[type]}
 */

function checkCode (err) {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '请求错误'
        break

      case 401:
        err.message = '未授权，请登录'
        break

      case 403:
        err.message = '拒绝访问'
        break

      case 404:
        err.message = `请求地址出错: ${err.response.config.url}`
        break

      case 408:
        err.message = '请求超时'
        break

      case 500:
        err.message = '服务器内部错误'
        break

      case 501:
        err.message = '服务未实现'
        break

      case 502:
        err.message = '网关错误'
        break

      case 503:
        err.message = '服务不可用'
        break

      case 504:
        err.message = '网关超时'
        break

      case 505:
        err.message = 'HTTP版本不受支持'
        break

      default:
    }
  }
  return err
}

const $request = {
  post (url, data) {
    return axios({
      method: 'post',
      url,
      data: qs.stringify(data)
    }).then(response => response).catch(error => (error))
  },
  postJson (url, data) {
    return axios({
      method: 'post',
      url,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    }).then(response => response).catch(error => (error))
  },
  get (url, params) {
    return axios({
      method: 'get',
      url,
      params // get 请求时带的参数
    }).then(response => response).catch(error => error)
  },
  jsonp
  // 使用实例
  // jsonp(url, null, (err, data) => {
  //   if (err) {
  //     console.error(err.message)
  //   } else {
  //     console.log(data)
  //   }
  // })
}
export default $request
