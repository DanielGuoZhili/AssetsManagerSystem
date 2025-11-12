import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Card, Typography, message, Space } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useAuth } from '@/state/AuthContext'
import './index.css'

const { Title, Text } = Typography

interface LoginForm {
  username: string
  password: string
}

const Login = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const onFinish = async (values: LoginForm) => {
    setLoading(true)
    try {
      await login(values.username, values.password)
      message.success('登录成功！')
      navigate('/home')
    } catch (error) {
      message.error('登录失败，请检查用户名和密码')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-content">
        <Card className="login-card" bordered={false}>
          <Space direction="vertical" size="large" style={{ width: '100%', textAlign: 'center' }}>
            <div>
              <Title level={2}>个人资产管理系统</Title>
              <Text type="secondary">欢迎回来，请登录您的账户</Text>
            </div>

            <Form
              name="login"
              initialValues={{ username: 'admin', password: 'admin123' }}
              onFinish={onFinish}
              size="large"
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: '请输入用户名！' }]}
              >
                <Input 
                  prefix={<UserOutlined />} 
                  placeholder="用户名" 
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: '请输入密码！' }]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="密码"
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} block>
                  登录
                </Button>
              </Form.Item>
            </Form>

            <div>
              <Text type="secondary" style={{ fontSize: 12 }}>
                提示：默认账号 admin / admin123
              </Text>
            </div>
          </Space>
        </Card>
      </div>
    </div>
  )
}

export default Login

