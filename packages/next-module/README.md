# @asset-manager/next-module

预留的 Next.js 扩展模块，用于未来可能的服务端渲染（SSR）或静态站点生成（SSG）需求。

## 🎯 用途

此模块预留用于以下场景：

1. **服务端渲染（SSR）** - 提升首屏加载速度和 SEO
2. **静态站点生成（SSG）** - 生成静态页面
3. **API 路由** - 提供后端 API 接口
4. **混合渲染** - 结合 CSR、SSR 和 SSG 的优势

## 📦 未来规划

### Phase 1 - 基础搭建
- [ ] 初始化 Next.js 项目
- [ ] 配置 TypeScript
- [ ] 集成 Ant Design
- [ ] 配置路由

### Phase 2 - 功能迁移
- [ ] 迁移现有页面到 Next.js
- [ ] 实现 SSR 渲染
- [ ] 优化性能

### Phase 3 - 高级功能
- [ ] API 路由开发
- [ ] 国际化支持
- [ ] 构建优化

## 🔧 技术栈（规划）

- **Next.js 14+** - React 框架
- **TypeScript** - 类型安全
- **Ant Design** - UI 组件库
- **@asset-manager/shared** - 共享模块

## 📝 使用方式

当前模块为预留状态，暂未实现。未来实现后，可以通过以下方式启动：

```bash
cd packages/next-module
pnpm install
pnpm dev
```

## 🤝 与其他模块的关系

- **共享 @asset-manager/shared 模块** - 复用工具函数和类型定义
- **可与 frontend 模块共存** - 支持增量迁移
- **独立部署** - 可单独部署为 SSR 应用

## 📄 License

MIT

