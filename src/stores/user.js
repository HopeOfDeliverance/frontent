import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null,
    token: localStorage.getItem('token') || '',
    isLoggedIn: false
  }),

  getters: {
    getUserInfo: (state) => state.userInfo,
    getToken: (state) => state.token,
    getLoginStatus: (state) => state.isLoggedIn
  },

  actions: {
    // 设置用户信息
    setUserInfo(userInfo) {
      this.userInfo = userInfo
      this.isLoggedIn = true
    },

    // 设置token
    setToken(token) {
      this.token = token
      localStorage.setItem('token', token)
    },

    // 清除用户信息
    clearUserInfo() {
      this.userInfo = null
      this.token = ''
      this.isLoggedIn = false
      localStorage.removeItem('token')
    },

    // 登录
    async login(loginData) {
      try {
        // 这里调用登录API
        // const response = await userApi.login(loginData)
        // this.setToken(response.token)
        // this.setUserInfo(response.userInfo)
        
        // 临时模拟登录成功
        this.setToken('mock_token_123')
        this.setUserInfo({
          id: 1,
          username: loginData.username,
          email: 'user@example.com'
        })
        
        return { success: true }
      } catch (error) {
        console.error('登录失败:', error)
        return { success: false, message: error.message }
      }
    },

    // 登出
    logout() {
      this.clearUserInfo()
    }
  }
}) 