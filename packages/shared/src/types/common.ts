/**
 * 通用响应类型
 */
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
  success: boolean;
}

/**
 * 分页参数
 */
export interface PaginationParams {
  page: number;
  pageSize: number;
}

/**
 * 分页响应
 */
export interface PaginationResponse<T = any> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}

/**
 * 用户信息
 */
export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  role: string;
  createdAt: string;
}

/**
 * 资产类型
 */
export enum AssetType {
  CASH = 'cash',
  STOCK = 'stock',
  FUND = 'fund',
  REAL_ESTATE = 'real_estate',
  OTHER = 'other'
}

/**
 * 资产信息
 */
export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  value: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

