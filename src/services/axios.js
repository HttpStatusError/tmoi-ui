import axios from "axios";
import { message } from "antd";
import * as C from '../constants'

const instance = axios.create({
    baseURL: C.API.BASE_URL
});

instance.interceptors.request.use(config => {
  config.headers['ticket'] = localStorage.getItem('ticket')
  return config;
})

// 请求返回后拦截
instance.interceptors.response.use(response => {
  const resp = response.data
    if (resp.code >= 42000 && resp.code <= 42002) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location = '/login'
    }
    return resp
}, error => {

    message.error('系统繁忙，请稍后再尝试')
    return Promise.reject(error)
})

export default instance;