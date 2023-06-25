import { ACCESS_TOKEN } from '@utils/constant'
import axios, {AxiosError} from 'axios';
import {modal, notification} from '@/components/EscapeAntd';

const whiteList = [
  '/code/image',
  '/auth/form',
  '/auth/signIn',
  '/auth/signUp'
];
const fullResponseList = ['/code/image', '/captcha', '/download'];

const service = axios.create({
  baseURL: import.meta.env.REACT_APP_API_BASE || '',
  timeout: 15000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
});

const errorHandler = (error: AxiosError) => {
  const token = localStorage.getItem(ACCESS_TOKEN)
  switch (error.response?.status) {
    case 400:
    case 401:
      notification.error({ message: '系统提示', description: '未授权，请重新登录', duration: 4 })
      if (token) {
        localStorage.removeItem(ACCESS_TOKEN);
        window.location.reload()
      }
      break
    case 403:
      modal.error({
        title: '登录已过期',
        content: '很抱歉，登录已过期，请重新登录',
        okText: '重新登录',
        mask: false,
        onOk: () => {
          localStorage.removeItem(ACCESS_TOKEN);
          window.location.reload()
        }
      })
      break
    case 500:
    case 502:
      notification.error({ message: '系统提示', description: '网络异常，请稍后重试...', duration: 4 })
      break
    case 404:
      notification.error({ message: '系统提示', description: '很抱歉，资源未找到!', duration: 4 })
      break
    case 504:
      notification.error({ message: '系统提示', description: '网络超时' })
      break

    default:
      notification.error({
        message: '系统提示',
        description: error.message ?error.message : '抱歉，系统故障请稍后重试...',
        duration: 4
      })
      break
  }
  return Promise.reject(error);
};

service.interceptors.request.use(
  async config => {
    const token = localStorage.getItem(ACCESS_TOKEN)
    if (token && config.url && !whiteList.includes(config.url)) {
      /*config.cancelToken = new axios.CancelToken((cancel) => {
        //使用vuex 定义pushCancel，请求进来存入
        // store.dispatch('user/pushCancel', {cancelToken:cancel})
      });*/
      config.headers['Authorization'] = `Bearer ${token}`;
    } else {
      config.headers['Authorization'] = 'Basic b2FfY2xpZW50Om9hX2NsaWVudF9zZWNyZXQ=';
    }
    return config;
  },
  error => Promise.reject(error)
);

let isErrorReporting = false
service.interceptors.response.use(response => {
  const {url, baseURL} = response.config;
  const apiUrl = url!.replace(baseURL!, '');
  if (response.data.code === '403' && !isErrorReporting) {
    isErrorReporting = true;
    // store.dispatch('user/clearCancel');
    // store/user
    /*
    state: {
      axiosCancelArr:[],
    },
    mutations:{
      PUSH_CANCEL(state, cancel){
        state.axiosCancelArr.push(cancel.cancelToken);
      },
      CLEAR_CANCEL(state){
        state.axiosCancelArr.forEach(e=>{
          e && e()
        });
        state.axiosCancelArr = [];
      }
    },
    actions: {
      pushCancel({commit}, cancel){
        commit('PUSH_CANCEL', cancel)
      },
      clearCancel({commit}){
        commit('CLEAR_CANCEL');
      }
    }
    */
    modal.error({
      title: '登录已过期',
      content: '很抱歉，登录已过期，请重新登录',
      okText: '重新登录',
      mask: false,
      onOk: () => {
        localStorage.removeItem(ACCESS_TOKEN);
        window.location.reload();
        isErrorReporting = false
      }
    })
  }
  if (fullResponseList.includes(apiUrl)) {
    return response
  }
  return response.data;
}, errorHandler);

export default service;
