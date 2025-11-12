import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '@/state/AuthContext'
import MainLayout from '@/layouts/MainLayout'
import Login from '@/pages/Login'
import Home from '@/pages/Home'
import Dashboard from '@/pages/Dashboard'

// 受保护的路由组件
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export function AppRouter() {
  return (
    <Routes>
      {/* 登录页面 */}
      <Route path="/login" element={<Login />} />

      {/* 主应用布局 */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        {/* 首页 */}
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="home" element={<Home />} />
        
        {/* 仪表盘 */}
        <Route path="dashboard" element={<Dashboard />} />
        
        {/* 404 */}
        <Route path="*" element={<div>404 - 页面未找到</div>} />
      </Route>
    </Routes>
  )
}

