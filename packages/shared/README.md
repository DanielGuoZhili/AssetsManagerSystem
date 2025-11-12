# @asset-manager/shared

共享工具库，包含通用的工具函数、类型定义和 React Hooks。

## 📦 包含内容

### Utils (工具函数)

- `hello()` - 示例问候函数
- `formatCurrency()` - 货币格式化
- `formatDate()` - 日期格式化

### Types (类型定义)

- `ApiResponse` - API 响应类型
- `PaginationParams` - 分页参数
- `User` - 用户信息
- `Asset` - 资产信息
- `AssetType` - 资产类型枚举

## 🔧 使用方式

在其他 monorepo 包中引入：

```typescript
import { hello, formatCurrency, User, Asset } from '@asset-manager/shared';

console.log(hello()); // "Hello from shared utils!"
```

## 📝 开发

添加新的工具函数或类型定义时，记得在 `src/index.ts` 中导出。

