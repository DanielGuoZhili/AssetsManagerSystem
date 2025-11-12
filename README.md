# 个人资产管理系统

基于 React + Ant Design + TypeScript + Vite 的现代化资产管理系统前端项目。

## 📁 项目结构

```
asset-manager-system/
├─ packages/
│  ├─ frontend/          # 主 React 前端 (Vite + Ant Design)
│  ├─ shared/            # 公共工具、hook、类型定义
│  └─ next-module/       # 预留未来扩展的 Next.js 模块
├─ package.json
├─ pnpm-workspace.yaml
└─ README.md
```

## 🚀 技术栈

- **React 18** - UI 框架
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **Ant Design** - UI 组件库
- **React Router** - 路由管理
- **pnpm** - 包管理器
- **Monorepo** - 项目架构

## 📦 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 启动开发服务器

```bash
pnpm dev
```

访问 http://localhost:5173 查看应用。

### 3. 构建生产版本

```bash
pnpm build
```

### 4. 预览生产构建

```bash
pnpm preview
```

## 📚 功能特性

- ✅ 现代化的仪表盘界面
- ✅ 完整的登录/认证流程
- ✅ 响应式布局设计
- ✅ 模块化的代码组织
- ✅ TypeScript 全面支持
- ✅ Monorepo 架构，易于扩展
- ✅ 共享工具库（shared）
- ✅ 💰 **当前收支情报** - 个人财务管理页面
  - 订阅服务管理
  - 投资策略追踪
  - 每月花费明细
  - 可视化收支总览
  - 可编辑的卡片式界面
  - 本地数据持久化

## 🏗️ 架构说明

### Frontend 模块

主前端应用，包含：
- **pages/** - 页面组件（首页、仪表盘、登录、当前收支情报等）
- **components/** - 可复用组件
- **hooks/** - 自定义 React Hooks
- **state/** - 状态管理
- **utils/** - 工具函数
- **types/** - TypeScript 类型定义

#### 页面说明
- **首页** - 系统概览和功能介绍
- **仪表盘** - 资产数据可视化和统计
- **当前收支情报** - 个人财务管理工具
  - 管理订阅服务（百度网盘、iCloud、Cursor 等）
  - 追踪投资策略（A股、NISA）
  - 记录每月花费（房租、年金、保险等）
  - 自动计算收支平衡

### Shared 模块

跨项目共享的代码：
- **utils/** - 通用工具函数
- **hooks/** - 通用 React Hooks
- **types/** - 通用类型定义

### Next-Module

预留的 Next.js 模块，用于未来扩展。

## 📝 开发规范

- 使用 TypeScript 进行类型检查
- 遵循 ESLint 代码规范
- 组件采用函数式组件 + Hooks
- 合理使用 Ant Design 组件
- 保持代码模块化和可维护性

## 📄 License

MIT

