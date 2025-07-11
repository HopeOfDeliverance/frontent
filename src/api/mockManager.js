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

// =================== 商品相关Mock数据 ===================

// 商品分类Mock数据
registerMockApi('GET', '/api/categories', async () => {
  await delay(300)
  return createSuccessResponse({
    categories: [
      { id: 'all', name: '全部', icon: '' },
      { id: 'vegetables', name: '蔬菜', icon: '' },
      { id: 'fruits', name: '水果', icon: '' },
      { id: 'meat', name: '肉类', icon: '' },
      { id: 'seafood', name: '海鲜', icon: '' },
      { id: 'dairy', name: '乳制品', icon: '' }
    ]
  })
})

// 商品列表Mock数据
registerMockApi('GET', '/api/products', async () => {
  await delay(500)
  return createSuccessResponse({
    products: [
      {
        id: 1,
        name: '山东红富士苹果',
        image: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=400&h=300&fit=crop',
        price: 12.8,
        unit: 'kg',
        stock: 2560,
        stockUnit: 'kg',
        categoryId: 'fruits',
        tags: ['热销'],
        description: '新鲜优质山东红富士苹果，口感脆甜'
      },
      {
        id: 2,
        name: '有机菠菜',
        image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop',
        price: 8.5,
        unit: 'kg',
        stock: 1250,
        stockUnit: 'kg',
        categoryId: 'vegetables',
        tags: [],
        description: '有机种植菠菜，绿色健康'
      },
      {
        id: 3,
        name: '挪威三文鱼',
        image: 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=400&h=300&fit=crop',
        price: 68.0,
        unit: 'kg',
        stock: 180,
        stockUnit: 'kg',
        categoryId: 'seafood',
        tags: ['新品'],
        description: '新鲜挪威三文鱼，肉质鲜美'
      },
      {
        id: 4,
        name: '精选牛肉',
        image: 'https://images.unsplash.com/photo-1529906091868-b0f05e58c7b5?w=400&h=300&fit=crop',
        price: 45.0,
        unit: 'kg',
        stock: 320,
        stockUnit: 'kg',
        categoryId: 'meat',
        tags: [],
        description: '优质牛肉，肉质鲜嫩'
      },
      {
        id: 5,
        name: '新鲜白菜',
        image: 'https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31?w=400&h=300&fit=crop',
        price: 3.2,
        unit: 'kg',
        stock: 1800,
        stockUnit: 'kg',
        categoryId: 'vegetables',
        tags: [],
        description: '新鲜白菜，清脆爽口'
      },
      {
        id: 6,
        name: '海南香蕉',
        image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop',
        price: 6.8,
        unit: 'kg',
        stock: 890,
        stockUnit: 'kg',
        categoryId: 'fruits',
        tags: ['热销'],
        description: '海南香蕉，香甜软糯'
      }
    ],
    total: 6
  })
})

// 轮播图Mock数据
registerMockApi('GET', '/api/banners', async () => {
  await delay(300)
  return createSuccessResponse({
    banners: [
      {
        id: 1,
        title: '春季特惠专场',
        subtitle: '全场满100减100',
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=300&fit=crop',
        link: '/promotion/spring',
        backgroundColor: '#4CAF50'
      },
      {
        id: 2,
        title: '新鲜水果节',
        subtitle: '限时优惠，品质保证',
        image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=800&h=300&fit=crop',
        link: '/category/fruits',
        backgroundColor: '#FF9800'
      },
      {
        id: 3,
        title: '优质海鲜',
        subtitle: '新鲜直达，营养丰富',
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=300&fit=crop',
        link: '/category/seafood',
        backgroundColor: '#2196F3'
      }
    ]
  })
})

// 搜索商品Mock数据
registerMockApi('GET', '/api/products/search', async (params) => {
  await delay(400)
  const { keyword = '' } = params
  
  const allProducts = [
    {
      id: 1,
      name: '山东红富士苹果',
      image: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=400&h=300&fit=crop',
      price: 12.8,
      unit: 'kg',
      stock: 2560,
      stockUnit: 'kg',
      categoryId: 'fruits',
      tags: ['热销']
    },
    {
      id: 2,
      name: '有机菠菜',
      image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop',
      price: 8.5,
      unit: 'kg',
      stock: 1250,
      stockUnit: 'kg',
      categoryId: 'vegetables',
      tags: []
    }
  ]
  
  const filteredProducts = allProducts.filter(product => 
    product.name.toLowerCase().includes(keyword.toLowerCase())
  )
  
  return createSuccessResponse({
    products: filteredProducts,
    total: filteredProducts.length
  })
})

// 热销商品Mock数据
registerMockApi('GET', '/api/products/hot', async () => {
  await delay(300)
  return createSuccessResponse({
    products: [
      {
        id: 1,
        name: '山东红富士苹果',
        image: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=400&h=300&fit=crop',
        price: 12.8,
        unit: 'kg',
        stock: 2560,
        stockUnit: 'kg',
        categoryId: 'fruits',
        tags: ['热销']
      },
      {
        id: 6,
        name: '海南香蕉',
        image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop',
        price: 6.8,
        unit: 'kg',
        stock: 890,
        stockUnit: 'kg',
        categoryId: 'fruits',
        tags: ['热销']
      }
    ]
  })
})

// 新品商品Mock数据
registerMockApi('GET', '/api/products/new', async () => {
  await delay(300)
  return createSuccessResponse({
    products: [
      {
        id: 3,
        name: '挪威三文鱼',
        image: 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=400&h=300&fit=crop',
        price: 68.0,
        unit: 'kg',
        stock: 180,
        stockUnit: 'kg',
        categoryId: 'seafood',
        tags: ['新品']
      }
    ]
  })
})