# Components

此目录用于存放可复用的 React 组件。

## 目录结构

```
components/
├── Button/          # 自定义按钮组件
├── Modal/           # 自定义弹窗组件
├── Form/            # 自定义表单组件
└── ...              # 其他组件
```

## 组件开发规范

1. 每个组件应该有自己的文件夹
2. 使用 TypeScript 进行类型定义
3. 组件应该是纯函数式组件
4. 导出 Props 类型定义
5. 添加必要的注释和文档

## 示例

```typescript
// components/Button/index.tsx
import { Button as AntButton } from 'antd'
import type { ButtonProps } from 'antd'

export interface CustomButtonProps extends ButtonProps {
  // 自定义属性
}

export const CustomButton: React.FC<CustomButtonProps> = (props) => {
  return <AntButton {...props} />
}
```

