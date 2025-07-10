<template>
  <div class="home">
    <!-- 导航栏 -->
    <van-nav-bar
      title="首页"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />

    <!-- 轮播图 -->
    <van-swipe class="banner" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(image, index) in bannerList" :key="index">
        <img :src="image" alt="轮播图" />
      </van-swipe-item>
    </van-swipe>

    <!-- 功能网格 -->
    <van-grid :column-num="4" class="feature-grid">
      <van-grid-item
        v-for="item in featureList"
        :key="item.id"
        :icon="item.icon"
        :text="item.title"
        @click="onFeatureClick(item)"
      />
    </van-grid>

    <!-- 商品列表 -->
    <div class="product-section">
      <van-divider content-position="left">热门商品</van-divider>
      <van-card
        v-for="product in productList"
        :key="product.id"
        :num="product.num"
        :price="product.price"
        :desc="product.desc"
        :title="product.title"
        :thumb="product.thumb"
        @click="onProductClick(product)"
      >
        <template #footer>
          <van-button size="mini" type="primary" @click.stop="addToCart(product)">
            加入购物车
          </van-button>
        </template>
      </van-card>
    </div>

    <!-- 底部导航 -->
    <van-tabbar v-model="activeTab" @change="onTabChange">
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/search">搜索</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" :badge="cartCount" to="/cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/profile">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { showToast } from 'vant'
import { useCartStore } from '@/stores/cart'

export default {
  name: 'Home',
  setup() {
    const cartStore = useCartStore()
    
    const activeTab = ref(0)
    
    // 轮播图数据
    const bannerList = ref([
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=375&h=200&fit=crop',
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=375&h=200&fit=crop',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=375&h=200&fit=crop'
    ])

    // 功能列表
    const featureList = ref([
      { id: 1, icon: 'bag-o', title: '商城' },
      { id: 2, icon: 'chat-o', title: '客服' },
      { id: 3, icon: 'star-o', title: '收藏' },
      { id: 4, icon: 'coupon-o', title: '优惠券' },
      { id: 5, icon: 'location-o', title: '门店' },
      { id: 6, icon: 'gift-o', title: '礼品' },
      { id: 7, icon: 'point-gift-o', title: '积分' },
      { id: 8, icon: 'more-o', title: '更多' }
    ])

    // 商品列表
    const productList = ref([
      {
        id: 1,
        title: 'Apple iPhone 15 Pro',
        desc: '搭载A17 Pro芯片，拍照更清晰',
        price: '7999.00',
        num: '1',
        thumb: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=200&h=200&fit=crop'
      },
      {
        id: 2,
        title: 'MacBook Air M2',
        desc: '轻薄便携，性能强劲',
        price: '8999.00',
        num: '1',
        thumb: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&h=200&fit=crop'
      },
      {
        id: 3,
        title: 'AirPods Pro 2',
        desc: '主动降噪，音质出众',
        price: '1899.00',
        num: '1',
        thumb: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=200&h=200&fit=crop'
      }
    ])

    // 购物车商品数量
    const cartCount = computed(() => cartStore.getCartItemCount)

    // 导航栏事件
    const onClickLeft = () => {
      showToast('返回')
    }

    const onClickRight = () => {
      showToast('按钮')
    }

    // 功能点击事件
    const onFeatureClick = (item) => {
      showToast(`点击了${item.title}`)
    }

    // 商品点击事件
    const onProductClick = (product) => {
      showToast(`查看商品：${product.title}`)
    }

    // 添加到购物车
    const addToCart = (product) => {
      cartStore.addToCart({
        id: product.id,
        title: product.title,
        price: parseFloat(product.price),
        thumb: product.thumb
      })
      showToast('已添加到购物车')
    }

    // 底部导航切换
    const onTabChange = (index) => {
      console.log('切换到第', index, '个标签')
    }

    return {
      activeTab,
      bannerList,
      featureList,
      productList,
      cartCount,
      onClickLeft,
      onClickRight,
      onFeatureClick,
      onProductClick,
      addToCart,
      onTabChange
    }
  }
}
</script>

<style scoped>
.home {
  padding-bottom: 60px;
}

.banner {
  height: 200px;
}

.banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.feature-grid {
  padding: 20px 0;
  background: white;
  margin-bottom: 10px;
}

.product-section {
  background: white;
  padding: 0 16px 20px;
}

.van-card {
  margin-bottom: 16px;
}
</style> 