import { useState, useEffect, useMemo } from 'react'
import { 
  Card, 
  Typography, 
  Row, 
  Col, 
  Button, 
  Table, 
  Modal, 
  Form, 
  Input, 
  InputNumber, 
  DatePicker,
  Space,
  Tag,
  Statistic,
  message,
  Popconfirm
} from 'antd'
import { Pie, Column, Line } from '@ant-design/charts'
import type { ColumnsType } from 'antd/es/table'
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  DollarOutlined,
  RiseOutlined,
  FallOutlined
} from '@ant-design/icons'
import dayjs, { Dayjs } from 'dayjs'
import './index.css'

const { Title, Text } = Typography

// 收入/支出项目类型
interface IncomeExpenseItem {
  id: string
  name: string
  amount: number
  type: 'income' | 'expense'
  category: string
}

// 每月记录类型
interface MonthlyRecord {
  id: string
  month: string // YYYY-MM格式
  income: number
  expense: number
  items: IncomeExpenseItem[]
  note?: string
}

// 默认数据
const defaultRecords: MonthlyRecord[] = [
  {
    id: '1',
    month: '2024-11',
    income: 400000,
    expense: 320000,
    items: [
      { id: '1-1', name: '工资', amount: 400000, type: 'income', category: '收入' },
      { id: '1-2', name: '房租', amount: 85000, type: 'expense', category: '住房' },
      { id: '1-3', name: '年金', amount: 17100, type: 'expense', category: '保险' },
      { id: '1-4', name: '保险', amount: 44000, type: 'expense', category: '保险' },
      { id: '1-5', name: '信用卡', amount: 100000, type: 'expense', category: '日常' },
      { id: '1-6', name: 'iCloud', amount: 450, type: 'expense', category: '订阅' },
      { id: '1-7', name: 'Cursor', amount: 2800, type: 'expense', category: '订阅' },
    ],
  },
  {
    id: '2',
    month: '2024-10',
    income: 400000,
    expense: 310000,
    items: [
      { id: '2-1', name: '工资', amount: 400000, type: 'income', category: '收入' },
      { id: '2-2', name: '房租', amount: 85000, type: 'expense', category: '住房' },
      { id: '2-3', name: '年金', amount: 17100, type: 'expense', category: '保险' },
      { id: '2-4', name: '保险', amount: 44000, type: 'expense', category: '保险' },
      { id: '2-5', name: '信用卡', amount: 95000, type: 'expense', category: '日常' },
    ],
  },
  {
    id: '3',
    month: '2024-09',
    income: 400000,
    expense: 335000,
    items: [
      { id: '3-1', name: '工资', amount: 400000, type: 'income', category: '收入' },
      { id: '3-2', name: '房租', amount: 85000, type: 'expense', category: '住房' },
      { id: '3-3', name: '年金', amount: 17100, type: 'expense', category: '保险' },
      { id: '3-4', name: '保险', amount: 44000, type: 'expense', category: '保险' },
      { id: '3-5', name: '住民税', amount: 71000, type: 'expense', category: '税金' },
      { id: '3-6', name: '信用卡', amount: 118000, type: 'expense', category: '日常' },
    ],
  },
]

const MonthlyIncome = () => {
  const [records, setRecords] = useState<MonthlyRecord[]>(defaultRecords)
  const [selectedMonth, setSelectedMonth] = useState<string>(dayjs().format('YYYY-MM'))
  const [modalVisible, setModalVisible] = useState(false)
  const [itemModalVisible, setItemModalVisible] = useState(false)
  const [editingRecord, setEditingRecord] = useState<MonthlyRecord | null>(null)
  const [editingItem, setEditingItem] = useState<IncomeExpenseItem | null>(null)
  const [form] = Form.useForm()
  const [itemForm] = Form.useForm()

  // 从 localStorage 加载数据
  useEffect(() => {
    const savedData = localStorage.getItem('monthlyRecords')
    if (savedData) {
      setRecords(JSON.parse(savedData))
    }
  }, [])

  // 保存数据到 localStorage
  const saveData = (newRecords: MonthlyRecord[]) => {
    setRecords(newRecords)
    localStorage.setItem('monthlyRecords', JSON.stringify(newRecords))
    message.success('保存成功！')
  }

  // 当前选中月份的记录
  const currentRecord = useMemo(() => {
    return records.find(r => r.month === selectedMonth)
  }, [records, selectedMonth])

  // 获取最近3个月的数据（用于图表）
  const recentMonthsData = useMemo(() => {
    const sorted = [...records].sort((a, b) => b.month.localeCompare(a.month))
    return sorted.slice(0, 3).reverse()
  }, [records])

  // 饼图数据 - 当月支出分类
  const pieData = useMemo(() => {
    if (!currentRecord) return []
    
    const categoryMap: Record<string, number> = {}
    currentRecord.items
      .filter(item => item.type === 'expense')
      .forEach(item => {
        categoryMap[item.category] = (categoryMap[item.category] || 0) + item.amount
      })
    
    return Object.entries(categoryMap).map(([category, amount]) => ({
      type: category,
      value: amount,
    }))
  }, [currentRecord])

  // 柱状图数据 - 近3个月收入支出对比
  const columnData = useMemo(() => {
    return recentMonthsData.flatMap(record => [
      { month: record.month, type: '收入', value: record.income },
      { month: record.month, type: '支出', value: record.expense },
    ])
  }, [recentMonthsData])

  // 折线图数据 - 近3个月收入支出趋势
  const lineData = useMemo(() => {
    return recentMonthsData.flatMap(record => [
      { month: record.month, type: '收入', value: record.income },
      { month: record.month, type: '支出', value: record.expense },
      { month: record.month, type: '余额', value: record.income - record.expense },
    ])
  }, [recentMonthsData])

  // 表格列定义
  const columns: ColumnsType<MonthlyRecord> = [
    {
      title: '月份',
      dataIndex: 'month',
      key: 'month',
      sorter: (a, b) => a.month.localeCompare(b.month),
      defaultSortOrder: 'descend',
    },
    {
      title: '收入',
      dataIndex: 'income',
      key: 'income',
      render: (value: number) => (
        <Text style={{ color: '#52c41a', fontWeight: 'bold' }}>
          ¥{value.toLocaleString()}
        </Text>
      ),
    },
    {
      title: '支出',
      dataIndex: 'expense',
      key: 'expense',
      render: (value: number) => (
        <Text style={{ color: '#ff4d4f', fontWeight: 'bold' }}>
          ¥{value.toLocaleString()}
        </Text>
      ),
    },
    {
      title: '余额',
      key: 'balance',
      render: (_, record) => {
        const balance = record.income - record.expense
        return (
          <Text style={{ color: balance >= 0 ? '#1890ff' : '#ff4d4f', fontWeight: 'bold' }}>
            ¥{balance.toLocaleString()}
          </Text>
        )
      },
    },
    {
      title: '明细',
      key: 'items',
      render: (_, record) => (
        <Space size="small">
          <Tag color="green">{record.items.filter(i => i.type === 'income').length} 项收入</Tag>
          <Tag color="red">{record.items.filter(i => i.type === 'expense').length} 项支出</Tag>
        </Space>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Button 
            type="link" 
            size="small" 
            icon={<EditOutlined />}
            onClick={() => openEditModal(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确认删除"
            description="删除后无法恢复，确定要删除吗？"
            onConfirm={() => handleDeleteRecord(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button 
              type="link" 
              danger 
              size="small" 
              icon={<DeleteOutlined />}
            >
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  // 明细项目表格列
  const itemColumns: ColumnsType<IncomeExpenseItem> = [
    {
      title: '项目名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag color={type === 'income' ? 'green' : 'red'}>
          {type === 'income' ? '收入' : '支出'}
        </Tag>
      ),
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
      render: (value: number) => `¥${value.toLocaleString()}`,
    },
    {
      title: '操作',
      key: 'action',
      render: (_, item) => (
        <Space size="small">
          <Button 
            type="link" 
            size="small" 
            icon={<EditOutlined />}
            onClick={() => openItemEditModal(item)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确认删除"
            onConfirm={() => handleDeleteItem(item.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button 
              type="link" 
              danger 
              size="small" 
              icon={<DeleteOutlined />}
            >
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  // 打开编辑月度记录弹窗
  const openEditModal = (record?: MonthlyRecord) => {
    setEditingRecord(record || null)
    if (record) {
      form.setFieldsValue({
        month: dayjs(record.month),
        note: record.note,
      })
      setSelectedMonth(record.month)
    } else {
      form.resetFields()
      form.setFieldsValue({ month: dayjs() })
    }
    setModalVisible(true)
  }

  // 保存月度记录
  const handleSaveRecord = () => {
    form.validateFields().then(values => {
      const month = values.month.format('YYYY-MM')
      
      if (editingRecord) {
        // 更新现有记录
        const newRecords = records.map(r => 
          r.id === editingRecord.id 
            ? { ...r, month, note: values.note }
            : r
        )
        saveData(newRecords)
      } else {
        // 创建新记录 - 复制上个月的内容
        // 找到最近的一条记录
        const sortedRecords = [...records].sort((a, b) => b.month.localeCompare(a.month))
        const lastRecord = sortedRecords[0]
        
        const newRecordId = Date.now().toString()
        let copiedItems: IncomeExpenseItem[] = []
        let income = 0
        let expense = 0
        
        if (lastRecord) {
          // 复制上个月的所有项目，但生成新的 id
          copiedItems = lastRecord.items.map((item, index) => ({
            ...item,
            id: `${newRecordId}-${Date.now()}-${index}`,
          }))
          
          // 计算总收入和支出
          income = copiedItems
            .filter(item => item.type === 'income')
            .reduce((sum, item) => sum + item.amount, 0)
          
          expense = copiedItems
            .filter(item => item.type === 'expense')
            .reduce((sum, item) => sum + item.amount, 0)
        }
        
        const newRecord: MonthlyRecord = {
          id: newRecordId,
          month,
          income,
          expense,
          items: copiedItems,
          note: values.note,
        }
        
        saveData([...records, newRecord])
        message.success(lastRecord ? `已复制 ${lastRecord.month} 的 ${copiedItems.length} 条记录` : '创建成功')
      }
      
      setModalVisible(false)
      setSelectedMonth(month)
      form.resetFields()
    })
  }

  // 删除月度记录
  const handleDeleteRecord = (id: string) => {
    const newRecords = records.filter(r => r.id !== id)
    saveData(newRecords)
  }

  // 打开编辑项目弹窗
  const openItemEditModal = (item?: IncomeExpenseItem) => {
    setEditingItem(item || null)
    if (item) {
      itemForm.setFieldsValue(item)
    } else {
      itemForm.resetFields()
    }
    setItemModalVisible(true)
  }

  // 保存项目
  const handleSaveItem = () => {
    if (!currentRecord) {
      message.error('请先选择或创建月度记录')
      return
    }

    itemForm.validateFields().then(values => {
      const newItem: IncomeExpenseItem = {
        id: editingItem?.id || `${currentRecord.id}-${Date.now()}`,
        ...values,
      }

      let newItems: IncomeExpenseItem[]
      if (editingItem) {
        newItems = currentRecord.items.map(item => 
          item.id === editingItem.id ? newItem : item
        )
      } else {
        newItems = [...currentRecord.items, newItem]
      }

      // 重新计算收入和支出
      const income = newItems
        .filter(item => item.type === 'income')
        .reduce((sum, item) => sum + item.amount, 0)
      
      const expense = newItems
        .filter(item => item.type === 'expense')
        .reduce((sum, item) => sum + item.amount, 0)

      const updatedRecord = {
        ...currentRecord,
        items: newItems,
        income,
        expense,
      }

      const newRecords = records.map(r => 
        r.id === currentRecord.id ? updatedRecord : r
      )

      saveData(newRecords)
      setItemModalVisible(false)
      itemForm.resetFields()
    })
  }

  // 删除项目
  const handleDeleteItem = (itemId: string) => {
    if (!currentRecord) return

    const newItems = currentRecord.items.filter(item => item.id !== itemId)
    
    const income = newItems
      .filter(item => item.type === 'income')
      .reduce((sum, item) => sum + item.amount, 0)
    
    const expense = newItems
      .filter(item => item.type === 'expense')
      .reduce((sum, item) => sum + item.amount, 0)

    const updatedRecord = {
      ...currentRecord,
      items: newItems,
      income,
      expense,
    }

    const newRecords = records.map(r => 
      r.id === currentRecord.id ? updatedRecord : r
    )

    saveData(newRecords)
  }

  return (
    <div className="monthly-income">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* 标题 */}
        <div>
          <Title level={2}>📊 每月收支管理</Title>
          <Text type="secondary">追踪和分析您的每月收支情况</Text>
        </div>

        {/* 图表区域 */}
        <Row gutter={[16, 16]}>
          {/* 饼图 - 当月支出分类 */}
          <Col xs={24} lg={8}>
            <Card title="当月支出分类" bordered={false}>
              {pieData.length > 0 ? (
                <Pie
                  data={pieData}
                  angleField="value"
                  colorField="type"
                  radius={0.8}
                  label={{
                    type: 'outer',
                    content: '{name} {percentage}',
                  }}
                  interactions={[{ type: 'element-active' }]}
                  height={250}
                />
              ) : (
                <div style={{ height: 250, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Text type="secondary">暂无数据</Text>
                </div>
              )}
            </Card>
          </Col>

          {/* 柱状图 - 近3个月收入支出对比 */}
          <Col xs={24} lg={8}>
            <Card title="近3个月收支对比" bordered={false}>
              {columnData.length > 0 ? (
                <Column
                  data={columnData}
                  xField="month"
                  yField="value"
                  seriesField="type"
                  isGroup={true}
                  columnStyle={{
                    radius: [4, 4, 0, 0],
                  }}
                  height={250}
                  label={{
                    position: 'top',
                    formatter: (datum: any) => `¥${(datum.value / 10000).toFixed(1)}万`,
                  }}
                  color={['#52c41a', '#ff4d4f']}
                />
              ) : (
                <div style={{ height: 250, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Text type="secondary">暂无数据</Text>
                </div>
              )}
            </Card>
          </Col>

          {/* 折线图 - 近3个月趋势 */}
          <Col xs={24} lg={8}>
            <Card title="近3个月收支趋势" bordered={false}>
              {lineData.length > 0 ? (
                <Line
                  data={lineData}
                  xField="month"
                  yField="value"
                  seriesField="type"
                  point={{
                    size: 5,
                    shape: 'circle',
                  }}
                  height={250}
                  color={['#52c41a', '#ff4d4f', '#1890ff']}
                />
              ) : (
                <div style={{ height: 250, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Text type="secondary">暂无数据</Text>
                </div>
              )}
            </Card>
          </Col>
        </Row>

        {/* 当前月份信息和操作 */}
        {currentRecord && (
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic
                  title="当前月份收入"
                  value={currentRecord.income}
                  precision={0}
                  prefix={<RiseOutlined />}
                  suffix="¥"
                  valueStyle={{ color: '#52c41a' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic
                  title="当前月份支出"
                  value={currentRecord.expense}
                  precision={0}
                  prefix={<FallOutlined />}
                  suffix="¥"
                  valueStyle={{ color: '#ff4d4f' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic
                  title="当前月份余额"
                  value={currentRecord.income - currentRecord.expense}
                  precision={0}
                  prefix={<DollarOutlined />}
                  suffix="¥"
                  valueStyle={{ 
                    color: currentRecord.income - currentRecord.expense >= 0 ? '#1890ff' : '#ff4d4f' 
                  }}
                />
              </Card>
            </Col>
          </Row>
        )}

        {/* 收支项目管理 */}
        <Card 
          title={`${selectedMonth} 收支明细`}
          extra={
            <Space>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={() => openItemEditModal()}
                disabled={!currentRecord}
              >
                添加收支项目
              </Button>
            </Space>
          }
        >
          {currentRecord ? (
            <Table
              columns={itemColumns}
              dataSource={currentRecord.items}
              rowKey="id"
              pagination={false}
              size="small"
            />
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <Text type="secondary">当前月份暂无记录，请先创建月度记录</Text>
            </div>
          )}
        </Card>

        {/* 月度记录表格 */}
        <Card 
          title="月度收支记录"
          extra={
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={() => openEditModal()}
            >
              新建月度记录
            </Button>
          }
        >
          <Table
            columns={columns}
            dataSource={records}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `共 ${total} 条记录`,
            }}
            onRow={(record) => ({
              onClick: () => setSelectedMonth(record.month),
              style: { 
                cursor: 'pointer',
                backgroundColor: record.month === selectedMonth ? '#f0f5ff' : undefined
              },
            })}
          />
        </Card>
      </Space>

      {/* 编辑月度记录弹窗 */}
      <Modal
        title={editingRecord ? '编辑月度记录' : '新建月度记录'}
        open={modalVisible}
        onOk={handleSaveRecord}
        onCancel={() => {
          setModalVisible(false)
          form.resetFields()
        }}
        okText="保存"
        cancelText="取消"
      >
        <Form form={form} layout="vertical">
          <Form.Item 
            label="月份" 
            name="month" 
            rules={[{ required: true, message: '请选择月份' }]}
          >
            <DatePicker picker="month" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="备注" name="note">
            <Input.TextArea rows={3} placeholder="选填：其他说明信息" />
          </Form.Item>
        </Form>
      </Modal>

      {/* 编辑收支项目弹窗 */}
      <Modal
        title={editingItem ? '编辑收支项目' : '添加收支项目'}
        open={itemModalVisible}
        onOk={handleSaveItem}
        onCancel={() => {
          setItemModalVisible(false)
          itemForm.resetFields()
        }}
        okText="保存"
        cancelText="取消"
      >
        <Form form={itemForm} layout="vertical">
          <Form.Item 
            label="项目名称" 
            name="name" 
            rules={[{ required: true, message: '请输入项目名称' }]}
          >
            <Input placeholder="如：工资、房租、信用卡等" />
          </Form.Item>

          <Form.Item 
            label="类型" 
            name="type" 
            rules={[{ required: true, message: '请选择类型' }]}
          >
            <Space>
              <Button 
                onClick={() => itemForm.setFieldsValue({ type: 'income' })}
                type={itemForm.getFieldValue('type') === 'income' ? 'primary' : 'default'}
              >
                收入
              </Button>
              <Button 
                onClick={() => itemForm.setFieldsValue({ type: 'expense' })}
                type={itemForm.getFieldValue('type') === 'expense' ? 'primary' : 'default'}
              >
                支出
              </Button>
            </Space>
          </Form.Item>

          <Form.Item 
            label="分类" 
            name="category" 
            rules={[{ required: true, message: '请输入分类' }]}
          >
            <Input placeholder="如：住房、保险、日常、订阅等" />
          </Form.Item>

          <Form.Item 
            label="金额" 
            name="amount" 
            rules={[{ required: true, message: '请输入金额' }]}
          >
            <InputNumber 
              style={{ width: '100%' }} 
              prefix="¥"
              min={0}
              placeholder="请输入金额"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default MonthlyIncome

