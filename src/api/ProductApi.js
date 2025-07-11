import { get, post } from './index.js'

/**
 * 获取商品列表
 * 功能描述：获取商品列表，支持分类筛选和分页
 * 入参：{ categoryId: string, page: number, pageSize: number }
 * 返回参数：{ products: Array, total: number }
 * url地址：/api/products
 * 请求方式：GET
 */
export function getProductList(params) {
  return get('/api/products', params)
}

/**
 * 获取商品分类列表
 * 功能描述：获取所有商品分类，用于分类导航
 * 入参：{}
 * 返回参数：{ categories: Array }
 * url地址：/api/categories
 * 请求方式：GET
 */
export function getCategoryList() {
  return get('/api/categories')
}

/**
 * 获取首页轮播图
 * 功能描述：获取首页轮播图数据
 * 入参：{}
 * 返回参数：{ banners: Array }
 * url地址：/api/banners
 * 请求方式：GET
 */
export function getBannerList() {
  return get('/api/banners')
}

/**
 * 搜索商品
 * 功能描述：根据关键字搜索商品
 * 入参：{ keyword: string, page: number, pageSize: number }
 * 返回参数：{ products: Array, total: number }
 * url地址：/api/products/search
 * 请求方式：GET
 */
export function searchProducts(params) {
  return get('/api/products/search', params)
}

/**
 * 获取热销商品
 * 功能描述：获取热销商品列表
 * 入参：{ limit: number }
 * 返回参数：{ products: Array }
 * url地址：/api/products/hot
 * 请求方式：GET
 */
export function getHotProducts(params) {
  return get('/api/products/hot', params)
}

/**
 * 获取新品商品
 * 功能描述：获取新品商品列表
 * 入参：{ limit: number }
 * 返回参数：{ products: Array }
 * url地址：/api/products/new
 * 请求方式：GET
 */
export function getNewProducts(params) {
  return get('/api/products/new', params)
} 