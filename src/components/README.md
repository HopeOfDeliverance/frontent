# 组件目录

此目录用于存放项目中的可复用组件。

## 组织方式

- 按功能模块分目录组织
- 每个组件可包含独立的README.md说明文档
- 组件命名使用PascalCase（大驼峰）

## 示例结构

```
components/
├── Common/          # 通用组件
│   ├── LoadingPage/ # 加载页面组件
│   └── EmptyState/  # 空状态组件
├── Business/        # 业务组件
│   ├── ProductCard/ # 商品卡片
│   └── UserProfile/ # 用户资料
└── Layout/          # 布局组件
    ├── PageHeader/  # 页面头部
    └── TabBar/      # 底部导航
```

## 开发规范

1. 每个组件应该职责单一，功能明确
2. 组件应该是可复用的，避免硬编码业务逻辑
3. 使用Vue 3 Composition API
4. 样式使用scoped避免污染
5. 为组件编写清晰的文档和使用示例 