import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
    totalCount: 0,
    totalPrice: 0
  }),

  getters: {
    getCartItems: (state) => state.cartItems,
    getTotalCount: (state) => state.totalCount,
    getTotalPrice: (state) => state.totalPrice,
    getCartItemCount: (state) => {
      return state.cartItems.reduce((total, item) => total + item.quantity, 0)
    },
    getCartTotalPrice: (state) => {
      return state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    }
  },

  actions: {
    // 添加商品到购物车
    addToCart(product) {
      const existingItem = this.cartItems.find(item => item.id === product.id)
      
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        this.cartItems.push({
          ...product,
          quantity: 1
        })
      }
      
      this.updateTotals()
      this.saveToStorage()
    },

    // 从购物车移除商品
    removeFromCart(productId) {
      const index = this.cartItems.findIndex(item => item.id === productId)
      if (index > -1) {
        this.cartItems.splice(index, 1)
        this.updateTotals()
        this.saveToStorage()
      }
    },

    // 更新商品数量
    updateQuantity(productId, quantity) {
      const item = this.cartItems.find(item => item.id === productId)
      if (item) {
        if (quantity <= 0) {
          this.removeFromCart(productId)
        } else {
          item.quantity = quantity
          this.updateTotals()
          this.saveToStorage()
        }
      }
    },

    // 清空购物车
    clearCart() {
      this.cartItems = []
      this.updateTotals()
      this.saveToStorage()
    },

    // 更新总计
    updateTotals() {
      this.totalCount = this.getCartItemCount
      this.totalPrice = this.getCartTotalPrice
    },

    // 保存到本地存储
    saveToStorage() {
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems))
    }
  }
}) 