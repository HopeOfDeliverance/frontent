<template>
  <div class="about">
    <van-nav-bar
      title="关于我们"
      left-arrow
      @click-left="$router.go(-1)"
    />

    <div class="content">
      <van-cell-group>
        <van-cell title="应用名称" value="Vue移动端应用" />
        <van-cell title="版本号" value="1.0.0" />
        <van-cell title="技术栈" value="Vue 3 + Vant 4" />
        <van-cell title="开发模式" value="移动端优先" />
      </van-cell-group>

      <van-divider>特性介绍</van-divider>

      <van-collapse v-model="activeNames" accordion>
        <van-collapse-item title="响应式设计" name="1">
          <div>基于Vant 4组件库，完美适配移动端设备，支持多种屏幕尺寸。</div>
        </van-collapse-item>
        <van-collapse-item title="现代化开发" name="2">
          <div>使用Vue 3 Composition API，配合Vite构建工具，开发体验更佳。</div>
        </van-collapse-item>
        <van-collapse-item title="状态管理" name="3">
          <div>集成Pinia状态管理，轻松管理应用状态和数据持久化。</div>
        </van-collapse-item>
        <van-collapse-item title="Mock数据" name="4">
          <div>内置Mock数据管理器，方便前端独立开发和调试。</div>
        </van-collapse-item>
      </van-collapse>

      <div class="contact-section">
        <van-divider>联系我们</van-divider>
        <van-button type="primary" block @click="showContact">
          联系开发者
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { showDialog } from 'vant'

export default {
  name: 'About',
  setup() {
    const activeNames = ref(['1'])

    const showContact = () => {
      showDialog({
        title: '联系方式',
        message: '这是一个Vue 3移动端项目示例\n\n技术栈：\n- Vue 3\n- Vant 4\n- Pinia\n- Vite\n- JavaScript',
      })
    }

    return {
      activeNames,
      showContact
    }
  }
}
</script>

<style scoped>
.about {
  min-height: 100vh;
  background-color: var(--van-background-color);
}

.content {
  padding: 16px;
}

.contact-section {
  margin-top: 40px;
}
</style> 