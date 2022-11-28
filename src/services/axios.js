import axios from "axios";
import { message } from "antd";
import * as C from '../constants'

let sourceRequest = {};

const instance = axios.create({
    baseURL: C.API.BASE_URL
});

instance.interceptors.request.use(config => {
  config.headers['ticket'] = localStorage.getItem('ticket')
  return config;
})

instance.interceptors.request.use(
  request => {
    let flag = request.url;
    if (request.url.indexOf("/tag-list") > 0) {
      flag = "/tag-list";
    }
    if (sourceRequest[flag]) {
      sourceRequest[flag].cancel("Automatic cancellation");
    }
    let tokenSource = axios.CancelToken.source();
    sourceRequest[flag] = { cancel: tokenSource.cancel };
    request.cancelToken = tokenSource.token;
    return request;
  },
  error => Promise.reject(error)
)

// 请求返回后拦截
instance.interceptors.response.use(
  response => {
    const resp = response.data
      if (resp.code >= 42000 && resp.code <= 42002) {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          window.location = '/login'
      }
      return resp
  },
  error => {
    if (axios.isCancel(error)) {
      return Promise.reject('cancel request')
    } else {
      message.error('系统繁忙，请稍后再尝试')
      return Promise.reject(error)
    }
  }
)

export default instance;