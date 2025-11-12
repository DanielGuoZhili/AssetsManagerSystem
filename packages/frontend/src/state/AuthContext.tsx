import React, { createContext, useContext, useState, useEffect } from 'react'
import type { User } from '@asset-manager/shared'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // 检查本地存储中的用户信息
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
      setIsAuthenticated(true)
    }
  }, [])

  const login = async (username: string, password: string) => {
    // 模拟登录 API 调用
    // 实际项目中应该调用后端 API
    if (username && password) {
      const mockUser: User = {
        id: '1',
        username,
        email: `${username}@example.com`,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + username,
        role: 'admin',
        createdAt: new Date().toISOString()
      }
      
      setUser(mockUser)
      setIsAuthenticated(true)
      localStorage.setItem('user', JSON.stringify(mockUser))
    } else {
      throw new Error('用户名或密码不能为空')
    }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

