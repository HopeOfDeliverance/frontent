# Vue移动端应用

基于Vue 3 + Vant 4的移动端应用框架，采用现代化开发技术栈，提供完整的移动端解决方案。

## 🚀 技术栈

- **前端框架**: Vue 3 + Composition API
- **UI组件库**: Vant 4 (移动端)
- **开发语言**: 原生JavaScript 
- **状态管理**: Pinia
- **构建工具**: Vite
- **路由管理**: Vue Router 4
- **HTTP请求**: Axios
- **样式方案**: CSS3 + CSS Variables

## 📁 项目结构

```
frontend/
├── public/                 # 静态资源目录
├── src/                    # 源代码目录
│   ├── api/               # API接口管理
│   │   ├── index.js       # Axios配置和请求封装
│   │   ├── mockManager.js # Mock数据管理器
│   │   └── UserApi.js     # 用户相关API
│   ├── assets/            # 静态资源
│   │   └── README.md      # 资源使用说明
│   ├── components/        # 可复用组件
│   │   └── README.md      # 组件开发规范
│   ├── router/            # 路由配置
│   │   └── index.js       # 路由定义
│   ├── stores/            # 状态管理
│   │   ├── user.js        # 用户状态
│   │   └── cart.js        # 购物车状态
│   ├── styles/            # 全局样式
│   │   └── index.css      # 基础样式和变量
│   ├── views/             # 页面组件
│   │   ├── Home/          # 首页
│   │   └── About/         # 关于页面
│   ├── App.vue            # 根组件
│   └── main.js            # 应用入口
├── docs/                  # 项目文档
├── index.html             # HTML入口文件
├── package.json           # 依赖配置
├── vite.config.js         # Vite配置
└── README.md              # 项目说明
```

## 🛠️ 安装和运行

### 环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0 或 yarn >= 1.22.0

### 安装依赖

```bash
npm install
# 或
yarn install
```

### 启动开发服务器

```bash
npm run dev
# 或
yarn dev
```

### 构建生产版本

```bash
npm run build
# 或
yarn build
```

### 预览生产构建

```bash
npm run preview
# 或
yarn preview
```

## 🎯 核心功能

### 1. 响应式布局
- 基于Vant 4组件库
- 完美适配移动端设备
- 支持多种屏幕尺寸

### 2. 状态管理
- 使用Pinia进行状态管理
- 用户登录态持久化
- 购物车数据管理

### 3. API管理
- 统一的API接口管理
- 完整的Mock数据系统
- 请求拦截和错误处理

### 4. 路由管理
- Vue Router 4
- 路由守卫
- 页面标题管理

## 📖 开发规范

### API开发规范

每个API文件必须包含完整的JSDoc注释：

```javascript
/**
 * 接口名称
 * 功能描述：详细描述接口的作用
 * 入参：{ param1: 类型, param2: 类型 }
 * 返回参数：返回数据结构说明
 * url地址：/api/endpoint
 * 请求方式：GET/POST
 */
export function apiFunction(params) {
  return get('/api/endpoint', params)
}
```

### Mock数据规范

- 所有API接口都必须在 `mockManager.js` 中提供Mock实现
- 使用 `registerMockApi(method, url, handler)` 注册Mock接口
- 返回数据格式统一使用 `createSuccessResponse()` 和 `createErrorResponse()`

### 组件开发规范

- 使用Vue 3 Composition API
- 组件命名使用PascalCase
- 样式使用scoped避免污染
- 职责单一，功能明确

## 🔧 配置说明

### Vite配置特性

- Vant组件自动导入
- Vue API自动导入
- 路径别名配置(@)
- 开发服务器配置

### 环境变量

项目支持多环境配置：

- `.env` - 通用配置
- `.env.development` - 开发环境
- `.env.production` - 生产环境

## 📱 移动端适配

### 视口配置

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
```

### 响应式字体

基于375px设计稿的rem适配：

```css
html {
  font-size: 37.5px; /* 基于375px设计稿 */
}
```

### PWA支持

项目预留了PWA配置，可根据需要启用。

## 🎨 UI组件

项目基于Vant 4组件库，已配置自动导入，直接使用即可：

```vue
<template>
  <van-button type="primary">按钮</van-button>
  <van-cell title="单元格" value="内容" />
</template>
```

## 📝 开发注意事项

1. **请求方式限制**: 仅允许使用GET和POST两种请求方式
2. **Mock优先**: 开发阶段优先使用Mock数据
3. **组件复用**: 优先使用Vant现有组件
4. **代码规范**: 遵循ESLint配置
5. **文档同步**: API变更时同步更新文档

## 🤝 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 详情请查看 [LICENSE](LICENSE) 文件。 