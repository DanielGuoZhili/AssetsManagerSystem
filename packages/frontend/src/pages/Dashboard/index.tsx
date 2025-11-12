import { Card, Typography, Row, Col, Statistic, Space, Progress, Table, Tag } from 'antd'
import { 
  DollarOutlined, 
  ArrowUpOutlined, 
  ArrowDownOutlined,
  WalletOutlined,
  StockOutlined,
  HomeOutlined,
  TrophyOutlined
} from '@ant-design/icons'
import { formatCurrency, formatDate, AssetType } from '@asset-manager/shared'
import type { ColumnsType } from 'antd/es/table'

const { Title, Text } = Typography

// 模拟资产数据
interface AssetItem {
  key: string
  name: string
  type: AssetType
  value: number
  change: number
  updateDate: string
}

const mockAssets: AssetItem[] = [
  {
    key: '1',
    name: '工商银行储蓄',
    type: AssetType.CASH,
    value: 50000,
    change: 5.2,
    updateDate: formatDate(new Date())
  },
  {
    key: '2',
    name: '腾讯股票',
    type: AssetType.STOCK,
    value: 30000,
    change: -2.8,
    updateDate: formatDate(new Date())
  },
  {
    key: '3',
    name: '易方达基金',
    type: AssetType.FUND,
    value: 20000,
    change: 8.5,
    updateDate: formatDate(new Date())
  },
]

const Dashboard = () => {
  // 资产类型图标映射
  const assetTypeIcons: Record<AssetType, React.ReactNode> = {
    [AssetType.CASH]: <WalletOutlined />,
    [AssetType.STOCK]: <StockOutlined />,
    [AssetType.FUND]: <TrophyOutlined />,
    [AssetType.REAL_ESTATE]: <HomeOutlined />,
    [AssetType.OTHER]: <DollarOutlined />,
  }

  // 资产类型标签颜色
  const assetTypeColors: Record<AssetType, string> = {
    [AssetType.CASH]: 'green',
    [AssetType.STOCK]: 'blue',
    [AssetType.FUND]: 'purple',
    [AssetType.REAL_ESTATE]: 'orange',
    [AssetType.OTHER]: 'default',
  }

  // 资产类型中文名
  const assetTypeNames: Record<AssetType, string> = {
    [AssetType.CASH]: '现金',
    [AssetType.STOCK]: '股票',
    [AssetType.FUND]: '基金',
    [AssetType.REAL_ESTATE]: '房产',
    [AssetType.OTHER]: '其他',
  }

  const columns: ColumnsType<AssetItem> = [
    {
      title: '资产名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: AssetType) => (
        <Tag icon={assetTypeIcons[type]} color={assetTypeColors[type]}>
          {assetTypeNames[type]}
        </Tag>
      ),
    },
    {
      title: '价值',
      dataIndex: 'value',
      key: 'value',
      render: (value: number) => formatCurrency(value),
      sorter: (a, b) => a.value - b.value,
    },
    {
      title: '涨跌幅',
      dataIndex: 'change',
      key: 'change',
      render: (change: number) => (
        <Text type={change >= 0 ? 'success' : 'danger'}>
          {change >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
          {' '}{Math.abs(change)}%
        </Text>
      ),
    },
    {
      title: '更新日期',
      dataIndex: 'updateDate',
      key: 'updateDate',
    },
  ]

  const totalAssets = mockAssets.reduce((sum, asset) => sum + asset.value, 0)
  const avgChange = mockAssets.reduce((sum, asset) => sum + asset.change, 0) / mockAssets.length

  return (
    <div>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* 页面标题 */}
        <div>
          <Title level={2}>📊 资产仪表盘</Title>
          <Text type="secondary">实时监控您的资产状况</Text>
        </div>

        {/* 总览统计 */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="总资产"
                value={totalAssets}
                precision={2}
                prefix="¥"
                suffix=""
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="资产数量"
                value={mockAssets.length}
                suffix="项"
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="平均涨幅"
                value={avgChange}
                precision={2}
                prefix={avgChange >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                suffix="%"
                valueStyle={{ color: avgChange >= 0 ? '#52c41a' : '#ff4d4f' }}
              />
            </Card>
          </Col>
          
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="最高单项"
                value={Math.max(...mockAssets.map(a => a.value))}
                precision={2}
                prefix="¥"
                valueStyle={{ color: '#faad14' }}
              />
            </Card>
          </Col>
        </Row>

        {/* 资产分布 */}
        <Card title="💰 资产类型分布">
          <Row gutter={[16, 16]}>
            {mockAssets.map((asset) => {
              const percentage = (asset.value / totalAssets) * 100
              return (
                <Col xs={24} sm={12} lg={8} key={asset.key}>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Space>
                      {assetTypeIcons[asset.type]}
                      <Text strong>{assetTypeNames[asset.type]}</Text>
                    </Space>
                    <Progress 
                      percent={Number(percentage.toFixed(1))} 
                      strokeColor={assetTypeColors[asset.type] === 'green' ? '#52c41a' : 
                                   assetTypeColors[asset.type] === 'blue' ? '#1890ff' : '#722ed1'}
                    />
                    <Text type="secondary">{formatCurrency(asset.value)}</Text>
                  </Space>
                </Col>
              )
            })}
          </Row>
        </Card>

        {/* 资产明细表 */}
        <Card title="📋 资产明细">
          <Table 
            columns={columns} 
            dataSource={mockAssets} 
            pagination={false}
            scroll={{ x: 800 }}
          />
        </Card>
      </Space>
    </div>
  )
}

export default Dashboard

