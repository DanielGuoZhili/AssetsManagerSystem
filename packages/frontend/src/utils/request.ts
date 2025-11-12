import type { ApiResponse } from '@asset-manager/shared'

/**
 * 封装的请求函数
 * 实际项目中应该配置 axios 或其他 HTTP 客户端
 */
export async function request<T = any>(
  url: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.message || '请求失败')
    }

    return data
  } catch (error) {
    throw error
  }
}

/**
 * GET 请求
 */
export function get<T = any>(url: string): Promise<ApiResponse<T>> {
  return request<T>(url, { method: 'GET' })
}

/**
 * POST 请求
 */
export function post<T = any>(url: string, data?: any): Promise<ApiResponse<T>> {
  return request<T>(url, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

/**
 * PUT 请求
 */
export function put<T = any>(url: string, data?: any): Promise<ApiResponse<T>> {
  return request<T>(url, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

/**
 * DELETE 请求
 */
export function del<T = any>(url: string): Promise<ApiResponse<T>> {
  return request<T>(url, { method: 'DELETE' })
}

