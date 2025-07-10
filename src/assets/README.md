# 静态资源目录

此目录用于存放项目中的静态资源文件。

## 目录结构

```
assets/
├── images/     # 图片资源
│   ├── icons/  # 图标
│   ├── logos/  # 标志
│   └── photos/ # 照片
├── fonts/      # 字体文件
├── videos/     # 视频文件
└── docs/       # 文档资源
```

## 使用规范

1. **图片格式**：优先使用WebP格式，兼容性考虑可使用JPEG/PNG
2. **图片命名**：使用小写字母和连字符，如 `user-avatar.png`
3. **图片优化**：上传前压缩图片，控制文件大小
4. **字体文件**：仅引入必要的字体，考虑加载性能
5. **文件组织**：按类型和用途分目录存放

## 导入方式

```javascript
// 静态导入
import logoImg from '@/assets/images/logo.png'

// 动态导入
const getImageUrl = (name) => {
  return new URL(`/src/assets/images/${name}`, import.meta.url).href
}
``` 