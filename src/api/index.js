import axios from 'axios'
import { showFailToast } from 'vant'
import { useUserStore } from '@/stores/user'

// 创建axios实例
const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 添加token到请求头
    const userStore = useUserStore()
    const token = userStore.getToken
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    const { data } = response
    
    // 统一处理响应格式
    if (data.success) {
      return data.body || data
    } else {
      showFailToast(data.message || '请求失败')
      return Promise.reject(new Error(data.message || '请求失败'))
    }
  },
  (error) => {
    console.error('响应错误:', error)
    
    if (error.response) {
      const { status, data } = error.response
      
      switch (status) {
        case 401:
          // 未授权，清除用户信息并跳转到登录页
          const userStore = useUserStore()
          userStore.logout()
          showFailToast('登录已过期，请重新登录')
          break
        case 403:
          showFailToast('没有权限访问')
          break
        case 404:
          showFailToast('请求的资源不存在')
          break
        case 500:
          showFailToast('服务器内部错误')
          break
        default:
          showFailToast(data?.message || '网络错误')
      }
    } else if (error.code === 'ECONNABORTED') {
      showFailToast('请求超时')
    } else {
      showFailToast('网络连接失败')
    }
    
    return Promise.reject(error)
  }
)

// 封装GET请求
export const get = (url, params = {}) => {
  return request.get(url, { params })
}

// 封装POST请求
export const post = (url, data = {}) => {
  return request.post(url, data)
}

export default request 