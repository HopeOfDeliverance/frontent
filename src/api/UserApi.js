import { get, post } from './index'
import mockManager, { createSuccessResponse, createErrorResponse, delay, registerMockApi } from './mockManager'

/**
 * 用户登录
 * 功能描述：用户通过用户名和密码进行登录认证
 * 入参：{ username: string, password: string }
 * 返回参数：{ token: string, userInfo: object }
 * url地址：/api/user/login
 * 请求方式：POST
 */
export function login(params) {
  return post('/user/login', params)
}

/**
 * 获取用户基本信息
 * 功能描述：获取当前登录用户的基本信息
 * 入参：无
 * 返回参数：{ user_id: number, username: string, email: string, status: string }
 * url地址：/api/user/info
 * 请求方式：GET
 */
export function getUserInfo() {
  return get('/user/info')
}

/**
 * 用户注册
 * 功能描述：新用户注册账号
 * 入参：{ username: string, password: string, email: string }
 * 返回参数：{ user_id: number, username: string, email: string }
 * url地址：/api/user/register
 * 请求方式：POST
 */
export function register(params) {
  return post('/user/register', params)
}

/**
 * 更新用户信息
 * 功能描述：更新当前用户的基本信息
 * 入参：{ username: string, email: string, avatar: string }
 * 返回参数：{ user_id: number, username: string, email: string, avatar: string }
 * url地址：/api/user/update
 * 请求方式：POST
 */
export function updateUserInfo(params) {
  return post('/user/update', params)
}

// ==================== Mock数据 ====================

// 注册用户登录Mock
registerMockApi('POST', '/user/login', async (params) => {
  await delay(800)
  
  const { username, password } = params
  
  if (!username || !password) {
    return createErrorResponse('用户名和密码不能为空')
  }
  
  if (username === 'admin' && password === '123456') {
    return createSuccessResponse({
      token: 'mock_token_' + Date.now(),
      userInfo: {
        user_id: 1,
        username: 'admin',
        email: 'admin@example.com',
        status: 'active',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
      }
    }, '登录成功')
  } else {
    return createErrorResponse('用户名或密码错误')
  }
})

// 注册获取用户信息Mock
registerMockApi('GET', '/user/info', async () => {
  await delay(300)
  
  return createSuccessResponse({
    user_id: 1,
    username: 'admin',
    email: 'admin@example.com',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    phone: '13888888888',
    created_at: '2024-01-01 10:00:00'
  }, '获取用户信息成功')
})

// 注册用户注册Mock
registerMockApi('POST', '/user/register', async (params) => {
  await delay(1000)
  
  const { username, password, email } = params
  
  if (!username || !password || !email) {
    return createErrorResponse('必填字段不能为空')
  }
  
  if (username === 'admin') {
    return createErrorResponse('用户名已存在')
  }
  
  return createSuccessResponse({
    user_id: Date.now(),
    username,
    email,
    status: 'active',
    created_at: new Date().toISOString()
  }, '注册成功')
})

// 注册更新用户信息Mock
registerMockApi('POST', '/user/update', async (params) => {
  await delay(500)
  
  return createSuccessResponse({
    user_id: 1,
    username: params.username || 'admin',
    email: params.email || 'admin@example.com',
    avatar: params.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    updated_at: new Date().toISOString()
  }, '更新用户信息成功')
}) 