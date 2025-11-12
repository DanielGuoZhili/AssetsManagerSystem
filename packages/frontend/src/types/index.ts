// 导出所有类型定义
export * from '@asset-manager/shared'

// 前端特有的类型定义可以在这里添加

/**
 * 路由配置类型
 */
export interface RouteConfig {
  path: string
  name: string
  icon?: React.ReactNode
  component?: React.ComponentType
  children?: RouteConfig[]
}

/**
 * 菜单项类型
 */
export interface MenuItem {
  key: string
  label: string
  icon?: React.ReactNode
  children?: MenuItem[]
}

