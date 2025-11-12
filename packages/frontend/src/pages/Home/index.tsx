import { Card, Typography, Row, Col, Space, Divider, Tag } from 'antd'
import { hello } from '@asset-manager/shared'
import { 
  DollarOutlined, 
  RiseOutlined, 
  FallOutlined,
  CheckCircleOutlined 
} from '@ant-design/icons'

const { Title, Text, Paragraph } = Typography

const Home = () => {
  const sharedMessage = hello()

  return (
    <div>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* 欢迎区域 */}
        <Card>
          <Title level={2}>👋 欢迎使用个人资产管理系统</Title>
          <Paragraph>
            这是一个现代化的资产管理解决方案，帮助您更好地管理和追踪个人资产。
          </Paragraph>
          
          <Divider />
          
          {/* 展示 Shared 模块使用示例 */}
          <Space direction="vertical" size="small">
            <Text strong>🔗 Shared 模块集成示例：</Text>
            <Tag color="blue" icon={<CheckCircleOutlined />}>
              {sharedMessage}
            </Tag>
            <Text type="secondary" style={{ fontSize: 12 }}>
              此消息来自 @asset-manager/shared 共享模块，展示了 monorepo 跨包引用功能。
            </Text>
          </Space>
        </Card>

        {/* 快速统计 */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={8}>
            <Card>
              <Space>
                <DollarOutlined style={{ fontSize: 32, color: '#1890ff' }} />
                <div>
                  <Text type="secondary">总资产</Text>
                  <Title level={4} style={{ margin: 0 }}>¥ 0.00</Title>
                </div>
              </Space>
            </Card>
          </Col>
          
          <Col xs={24} sm={12} lg={8}>
            <Card>
              <Space>
                <RiseOutlined style={{ fontSize: 32, color: '#52c41a' }} />
                <div>
                  <Text type="secondary">本月收入</Text>
                  <Title level={4} style={{ margin: 0, color: '#52c41a' }}>¥ 0.00</Title>
                </div>
              </Space>
            </Card>
          </Col>
          
          <Col xs={24} sm={12} lg={8}>
            <Card>
              <Space>
                <FallOutlined style={{ fontSize: 32, color: '#ff4d4f' }} />
                <div>
                  <Text type="secondary">本月支出</Text>
                  <Title level={4} style={{ margin: 0, color: '#ff4d4f' }}>¥ 0.00</Title>
                </div>
              </Space>
            </Card>
          </Col>
        </Row>

        {/* 功能介绍 */}
        <Card title="✨ 系统特性">
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Space direction="vertical">
                <Text strong>🎨 现代化 UI</Text>
                <Text type="secondary">基于 Ant Design 的精美界面设计</Text>
              </Space>
            </Col>
            <Col xs={24} md={12}>
              <Space direction="vertical">
                <Text strong>📊 数据可视化</Text>
                <Text type="secondary">直观的图表展示资产状况</Text>
              </Space>
            </Col>
            <Col xs={24} md={12}>
              <Space direction="vertical">
                <Text strong>🔒 安全可靠</Text>
                <Text type="secondary">完善的认证和权限管理</Text>
              </Space>
            </Col>
            <Col xs={24} md={12}>
              <Space direction="vertical">
                <Text strong>📱 响应式设计</Text>
                <Text type="secondary">完美适配各种设备屏幕</Text>
              </Space>
            </Col>
          </Row>
        </Card>

        {/* 架构说明 */}
        <Card title="🏗️ 技术架构">
          <Space wrap>
            <Tag color="blue">React 18</Tag>
            <Tag color="purple">TypeScript</Tag>
            <Tag color="cyan">Vite</Tag>
            <Tag color="geekblue">Ant Design</Tag>
            <Tag color="magenta">pnpm Monorepo</Tag>
            <Tag color="green">React Router</Tag>
          </Space>
        </Card>
      </Space>
    </div>
  )
}

export default Home

