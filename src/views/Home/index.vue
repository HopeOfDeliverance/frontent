<template>
  <div class="home">
    <!-- 顶部导航栏 -->
    <van-nav-bar 
      class="home-navbar"
      left-arrow="false"
      fixed
      placeholder
    >
      <template #title>
        <div class="navbar-content">
          <div class="logo">
            <div class="logo-icon">鲜</div>
            <span class="logo-text">鲜果汇</span>
          </div>
          <div class="search-box">
            <van-search
              v-model="searchKeyword"
              shape="round"
              placeholder="搜索商品..."
              @search="handleSearch"
            />
          </div>
          <div class="cart-icon" @click="goToCart">
            <van-icon name="shopping-cart-o" />
            <van-badge :content="cartCount" v-if="cartCount > 0" />
          </div>
        </div>
      </template>
    </van-nav-bar>

    <!-- 轮播图 -->
    <van-swipe 
      class="banner-swipe"
      :autoplay="3000"
      indicator-color="white"
    >
      <van-swipe-item 
        v-for="banner in banners" 
        :key="banner.id"
        :style="{ backgroundColor: banner.backgroundColor }"
      >
        <div class="banner-content">
          <div class="banner-text">
            <h2>{{ banner.title }}</h2>
            <p>{{ banner.subtitle }}</p>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>

    <!-- 分类导航 -->
    <van-tabs 
      v-model:active="activeCategory" 
      class="category-tabs"
      line-width="20px"
      line-height="3px"
      color="#4CAF50"
      @change="handleCategoryChange"
    >
      <van-tab 
        v-for="category in categories" 
        :key="category.id"
        :title="category.name"
        :name="category.id"
      />
    </van-tabs>

    <!-- 商品列表 -->
    <div class="product-list">
      <van-row gutter="12">
        <van-col 
          span="12" 
          v-for="product in products" 
          :key="product.id"
        >
          <div class="product-card">
            <div class="product-image-container">
              <img :src="product.image" :alt="product.name" class="product-image" />
              <div class="product-tags">
                <span 
                  v-for="tag in product.tags" 
                  :key="tag"
                  :class="['tag', getTagClass(tag)]"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
            <div class="product-info">
              <h3 class="product-name">{{ product.name }}</h3>
              <div class="product-price">
                <span class="price">¥{{ product.price }}</span>
                <span class="unit">/{{ product.unit }}</span>
              </div>
              <div class="product-stock">
                库存: {{ product.stock }}{{ product.stockUnit }}
              </div>
              <div class="product-actions">
                <van-button 
                  type="primary" 
                  size="small"
                  round
                  icon="plus"
                  @click="addToCart(product)"
                />
              </div>
            </div>
          </div>
        </van-col>
      </van-row>
    </div>

    <!-- 底部导航 -->
    <van-tabbar v-model="activeTab" fixed placeholder>
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to="/category">分类</van-tabbar-item>
      <van-tabbar-item icon="orders-o" to="/orders">订单</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/profile">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'
import { getProductList, getCategoryList, getBannerList } from '@/api'
import { useCartStore } from '@/stores/cart'

export default {
  name: 'Home',
  setup() {
    const router = useRouter()
    const cartStore = useCartStore()
    
    // 响应式数据
    const searchKeyword = ref('')
    const activeCategory = ref('all')
    const activeTab = ref(0)
    const products = ref([])
    const categories = ref([])
    const banners = ref([])
    const cartCount = ref(3) // 购物车数量

    // 加载数据
    const loadData = async () => {
      try {
        // 并行加载所有数据
        const [productResult, categoryResult, bannerResult] = await Promise.all([
          getProductList({ categoryId: activeCategory.value }),
          getCategoryList(),
          getBannerList()
        ])

        products.value = productResult.products
        categories.value = categoryResult.categories
        banners.value = bannerResult.banners
      } catch (error) {
        console.error('加载数据失败:', error)
        showToast('加载数据失败，请稍后重试')
      }
    }

    // 处理搜索
    const handleSearch = (keyword) => {
      console.log('搜索关键词:', keyword)
      router.push(`/search?keyword=${encodeURIComponent(keyword)}`)
    }

    // 处理分类切换
    const handleCategoryChange = async (categoryId) => {
      try {
        const result = await getProductList({ categoryId })
        products.value = result.products
      } catch (error) {
        console.error('加载分类商品失败:', error)
        showToast('加载分类商品失败')
      }
    }

    // 添加到购物车
    const addToCart = (product) => {
      cartStore.addToCart(product)
      showToast('已添加到购物车')
      cartCount.value++
    }

    // 前往购物车
    const goToCart = () => {
      router.push('/cart')
    }

    // 获取标签样式
    const getTagClass = (tag) => {
      switch (tag) {
        case '热销':
          return 'tag-hot'
        case '新品':
          return 'tag-new'
        default:
          return 'tag-default'
      }
    }

    // 生命周期
    onMounted(() => {
      loadData()
    })

    return {
      searchKeyword,
      activeCategory,
      activeTab,
      products,
      categories,
      banners,
      cartCount,
      handleSearch,
      handleCategoryChange,
      addToCart,
      goToCart,
      getTagClass
    }
  }
}
</script>

<style scoped>
.home {
  background: #f8f9fa;
  min-height: 100vh;
  padding-bottom: 70px;
}

/* 顶部导航栏 */
.home-navbar {
  background: white;
  border-bottom: 1px solid #eee;
}

.navbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 16px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo-icon {
  width: 32px;
  height: 32px;
  background: #4CAF50;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
}

.logo-text {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.search-box {
  flex: 1;
  margin: 0 16px;
  max-width: 200px;
}

.cart-icon {
  position: relative;
  cursor: pointer;
  font-size: 22px;
  color: #333;
}

/* 轮播图 */
.banner-swipe {
  height: 160px;
  margin: 8px 16px;
  border-radius: 12px;
  overflow: hidden;
}

.banner-content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
}

.banner-text {
  color: white;
  text-align: center;
}

.banner-text h2 {
  font-size: 24px;
  margin: 0 0 8px 0;
  font-weight: bold;
}

.banner-text p {
  font-size: 14px;
  margin: 0;
  opacity: 0.9;
}

/* 分类导航 */
.category-tabs {
  background: white;
  margin: 0 16px;
  border-radius: 12px;
  overflow: hidden;
}

/* 商品列表 */
.product-list {
  padding: 16px;
}

.product-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.product-image-container {
  position: relative;
  height: 120px;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-tags {
  position: absolute;
  top: 8px;
  left: 8px;
  display: flex;
  gap: 4px;
}

.tag {
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  color: white;
  font-weight: bold;
}

.tag-hot {
  background: #ff4444;
}

.tag-new {
  background: #4CAF50;
}

.tag-default {
  background: #999;
}

.product-info {
  padding: 12px;
}

.product-name {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin: 0 0 8px 0;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-price {
  display: flex;
  align-items: baseline;
  gap: 2px;
  margin-bottom: 4px;
}

.price {
  font-size: 16px;
  font-weight: bold;
  color: #ff4444;
}

.unit {
  font-size: 12px;
  color: #999;
}

.product-stock {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}

.product-actions {
  display: flex;
  justify-content: flex-end;
}

.product-actions .van-button {
  background: #4CAF50;
  border-color: #4CAF50;
  width: 28px;
  height: 28px;
}
</style> 