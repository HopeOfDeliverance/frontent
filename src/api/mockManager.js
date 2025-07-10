// Mock数据管理器
class MockManager {
  constructor() {
    this.mockApis = new Map()
    this.isEnabled = import.meta.env.VITE_MOCK_ENABLED === 'true' || true
  }

  // 注册Mock API
  registerMockApi(method, url, handler) {
    const key = `${method.toUpperCase()}:${url}`
    this.mockApis.set(key, handler)
  }

  // 获取Mock处理器
  getMockHandler(method, url) {
    const key = `${method.toUpperCase()}:${url}`
    return this.mockApis.get(key)
  }

  // 检查是否启用Mock
  isEnabledMock() {
    return this.isEnabled
  }

  // 设置Mock状态
  setMockEnabled(enabled) {
    this.isEnabled = enabled
  }
}

// 创建全局实例
const mockManager = new MockManager()

// 成功响应格式
export const createSuccessResponse = (data, message = '操作成功') => {
  return {
    error: 0,
    body: data,
    message,
    success: true
  }
}

// 错误响应格式
export const createErrorResponse = (message = '操作失败', error = 1) => {
  return {
    error,
    body: null,
    message,
    success: false
  }
}

// 模拟延迟
export const delay = (ms = 500) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// 注册Mock API的便捷方法
export const registerMockApi = (method, url, handler) => {
  mockManager.registerMockApi(method, url, handler)
}

// 导出管理器实例
export default mockManager 