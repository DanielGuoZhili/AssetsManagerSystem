# 🚀 快速开始指南

欢迎使用个人资产管理系统！本指南将帮助您快速搭建和运行项目。

## 📋 前置要求

在开始之前，请确保您的系统已安装以下软件：

- **Node.js**: >= 16.0.0 (推荐使用 18.x 或 20.x)
- **pnpm**: >= 8.0.0

### 安装 pnpm

如果您还没有安装 pnpm，可以通过以下命令安装：

```bash
# 使用 npm 安装
npm install -g pnpm

# 或使用 Windows PowerShell
iwr https://get.pnpm.io/install.ps1 -useb | iex
```

## 🛠️ 安装步骤

### 1. 安装依赖

在项目根目录下运行：

```bash
pnpm install
```

这将自动安装所有子包（frontend、shared、next-module）的依赖。

### 2. 启动开发服务器

```bash
pnpm dev
```

这将启动 frontend 前端开发服务器，默认运行在 http://localhost:5173

### 3. 访问应用

打开浏览器访问：http://localhost:5173

默认登录账号：
- 用户名：`admin`
- 密码：`admin123`

## 📦 项目结构说明

```
AssetsManagerSystem/
├── packages/
│   ├── frontend/          # 主 React 前端应用
│   │   ├── src/
│   │   │   ├── pages/     # 页面组件
│   │   │   │   ├── Home/      # 首页
│   │   │   │   ├── Dashboard/ # 仪表盘
│   │   │   │   └── Login/     # 登录页
│   │   │   ├── components/    # 可复用组件
│   │   │   ├── layouts/       # 布局组件
│   │   │   ├── router/        # 路由配置
│   │   │   ├── state/         # 状态管理
│   │   │   ├── hooks/         # 自定义 Hooks
│   │   │   ├── utils/         # 工具函数
│   │   │   └── types/         # 类型定义
│   │   └── package.json
│   │
│   ├── shared/            # 共享工具库
│   │   ├── src/
│   │   │   ├── utils/     # 通用工具函数
│   │   │   └── types/     # 通用类型定义
│   │   └── package.json
│   │
│   └── next-module/       # 预留 Next.js 模块
│       └── package.json
│
├── package.json           # 根配置
├── pnpm-workspace.yaml    # pnpm workspace 配置
└── README.md
```

## 🎯 主要功能

### 已实现功能

✅ **用户认证**
- 登录/登出功能
- 路由权限保护

✅ **现代化 UI**
- 基于 Ant Design 5
- 响应式布局
- 侧边栏导航

✅ **页面**
- 首页 - 展示系统概览
- 仪表盘 - 资产数据可视化
- 登录页 - 用户认证

✅ **Monorepo 架构**
- 模块化设计
- 共享代码复用
- 易于扩展

### 示例功能展示

**Shared 模块使用示例：**

在首页可以看到来自 `@asset-manager/shared` 模块的问候消息，展示了跨包引用功能。

```typescript
// 在 frontend 中引用 shared 模块
import { hello, formatCurrency } from '@asset-manager/shared'

const message = hello() // "Hello from shared utils!"
const price = formatCurrency(12345.67) // "¥12,345.67"
```

## 🔧 开发命令

### 根目录命令

```bash
# 安装所有依赖
pnpm install

# 启动前端开发服务器
pnpm dev

# 构建前端生产版本
pnpm build

# 预览前端生产构建
pnpm preview
```

### Frontend 专用命令

```bash
# 进入 frontend 目录
cd packages/frontend

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 代码检查
pnpm lint
```

### Shared 专用命令

```bash
# 进入 shared 目录
cd packages/shared

# 类型检查
pnpm type-check
```

## 📱 页面路由

| 路径 | 页面 | 说明 | 是否需要认证 |
|------|------|------|------------|
| `/login` | 登录页 | 用户登录界面 | ❌ |
| `/home` | 首页 | 系统首页，展示概览信息 | ✅ |
| `/dashboard` | 仪表盘 | 资产数据可视化 | ✅ |

## 🎨 技术栈

### Frontend
- **React 18** - UI 框架
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **Ant Design 5** - UI 组件库
- **React Router 6** - 路由管理

### Shared
- **TypeScript** - 类型定义
- **纯 JavaScript** - 工具函数

### 开发工具
- **pnpm** - 包管理器
- **ESLint** - 代码检查
- **Monorepo** - 项目架构

## 🐛 常见问题

### Q1: pnpm install 报错？

**A:** 请确保：
1. Node.js 版本 >= 16.0.0
2. pnpm 版本 >= 8.0.0
3. 网络连接正常

### Q2: 启动后页面空白？

**A:** 请检查：
1. 是否运行了 `pnpm install`
2. 浏览器控制台是否有错误
3. 端口 5173 是否被占用

### Q3: 如何修改端口？

**A:** 编辑 `packages/frontend/vite.config.ts`：

```typescript
server: {
  port: 3000, // 修改为您想要的端口
  open: true,
}
```

### Q4: 如何添加新的页面？

**A:** 
1. 在 `packages/frontend/src/pages/` 创建新的页面组件
2. 在 `packages/frontend/src/router/index.tsx` 添加路由配置
3. 在 `packages/frontend/src/layouts/MainLayout.tsx` 添加菜单项

## 📝 下一步

现在您已经成功运行了项目！接下来可以：

1. 📚 阅读 [README.md](./README.md) 了解更多架构细节
2. 🔍 浏览 `packages/frontend/src` 了解代码结构
3. ✨ 开始添加您的自定义功能
4. 🎨 根据需求调整 UI 样式

## 📞 需要帮助？

如果遇到问题，请：
1. 查看项目文档
2. 检查浏览器控制台错误信息
3. 确认所有依赖已正确安装

祝您开发愉快！🎉

