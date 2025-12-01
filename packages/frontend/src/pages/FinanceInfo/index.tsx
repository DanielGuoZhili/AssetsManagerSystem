import { useState, useEffect } from 'react';
import {
  Card,
  Typography,
  Row,
  Col,
  Space,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  message,
  Tag,
  Statistic,
} from 'antd';
import {
  EditOutlined,
  DollarOutlined,
  CreditCardOutlined,
  RiseOutlined,
  ThunderboltOutlined,
  ShoppingOutlined,
  StockOutlined,
} from '@ant-design/icons';
import './index.css';

const { Title, Text } = Typography;

// 数据类型定义
interface Subscription {
  id: string;
  name: string;
  amount: string;
  cycle: string;
  currency: string;
}

interface Investment {
  id: string;
  category: string;
  name: string;
  amount: string;
  cycle: string;
  note?: string;
}

interface Expense {
  id: string;
  name: string;
  amount: string;
  cycle: string;
  note?: string;
}

interface FinanceData {
  subscriptions: Subscription[];
  investments: Investment[];
  expenses: Expense[];
  income: number;
}

// 默认数据
const defaultData: FinanceData = {
  subscriptions: [
    { id: '1', name: '百度网盘', amount: '未知', cycle: '每月', currency: '¥' },
    {
      id: '2',
      name: 'iCloud 450',
      amount: '450',
      cycle: '每月',
      currency: '¥',
    },
    { id: '3', name: 'Cursor', amount: '20', cycle: '每月', currency: '$' },
    { id: '4', name: 'Amazon', amount: '未知', cycle: '每年', currency: '¥' },
    {
      id: '5',
      name: 'DC 卡（JAL 会费）',
      amount: '未知',
      cycle: '每年',
      currency: '¥',
    },
  ],
  investments: [
    {
      id: '1',
      category: 'A股',
      name: '红利ETF',
      amount: '根据剩余工资',
      cycle: '灵活',
      note: 'SBI',
    },
    {
      id: '2',
      category: 'NISA',
      name: 'eMAXIS Slim 全世界株式',
      amount: '20000',
      cycle: '每月',
    },
    {
      id: '3',
      category: 'NISA',
      name: '任天堂等个股',
      amount: '10000',
      cycle: '每月',
      note: '也可能投入当月余钱',
    },
  ],
  expenses: [
    { id: '1', name: '房租', amount: '85000', cycle: '每月' },
    { id: '2', name: '年金', amount: '17100', cycle: '每月', note: '左右' },
    { id: '3', name: '保险', amount: '44000', cycle: '每月', note: '左右' },
    {
      id: '4',
      name: '住民税',
      amount: '71000',
      cycle: '每3个月',
      note: '一期',
    },
    {
      id: '5',
      name: '信用卡还款',
      amount: '80000-130000',
      cycle: '每月',
      note: '包括水电费、日常消费、网购',
    },
    {
      id: '6',
      name: '电脑分期',
      amount: '4900',
      cycle: '每月',
      note: '到2025年2月结束',
    },
    { id: '7', name: 'iCloud', amount: '450', cycle: '每月' },
    { id: '8', name: 'Cursor', amount: '2800', cycle: '每月', note: '约$20' },
  ],
  income: 400000,
};

const FinanceInfo = () => {
  const [data, setData] = useState<FinanceData>(defaultData);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editType, setEditType] = useState<
    'subscription' | 'investment' | 'expense' | 'income'
  >('subscription');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [form] = Form.useForm();

  // 从 localStorage 加载数据
  useEffect(() => {
    const savedData = localStorage.getItem('financeData');
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  // 保存数据到 localStorage
  const saveData = (newData: FinanceData) => {
    setData(newData);
    localStorage.setItem('financeData', JSON.stringify(newData));
    message.success('保存成功！');
  };

  // 打开编辑弹窗
  const openEditModal = (type: typeof editType, item?: any) => {
    setEditType(type);
    setEditingItem(item || null);

    if (type === 'income') {
      form.setFieldsValue({ income: data.income });
    } else if (item) {
      form.setFieldsValue(item);
    } else {
      form.resetFields();
    }

    setEditModalVisible(true);
  };

  // 保存编辑
  const handleSave = () => {
    form.validateFields().then((values) => {
      if (editType === 'income') {
        saveData({ ...data, income: values.income });
      } else {
        const key =
          editType === 'subscription'
            ? 'subscriptions'
            : editType === 'investment'
            ? 'investments'
            : 'expenses';

        if (editingItem) {
          // 编辑现有项
          const newItems = data[key].map((item: any) =>
            item.id === editingItem.id
              ? { ...values, id: editingItem.id }
              : item
          );
          saveData({ ...data, [key]: newItems });
        } else {
          // 添加新项
          const newItem = { ...values, id: Date.now().toString() };
          saveData({ ...data, [key]: [...data[key], newItem] });
        }
      }

      setEditModalVisible(false);
      form.resetFields();
    });
  };

  // 删除项目
  const handleDelete = (
    type: 'subscription' | 'investment' | 'expense',
    id: string
  ) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个项目吗？',
      onOk: () => {
        const key =
          type === 'subscription'
            ? 'subscriptions'
            : type === 'investment'
            ? 'investments'
            : 'expenses';
        const newItems = data[key].filter((item: any) => item.id !== id);
        saveData({ ...data, [key]: newItems });
      },
    });
  };

  // 计算总支出
  const calculateTotalExpense = () => {
    let total = 0;
    data.expenses.forEach((expense) => {
      const amount = expense.amount.replace(/[^\d.-]/g, '');
      if (amount.includes('-')) {
        const [min, max] = amount.split('-').map(Number);
        total += (min + max) / 2;
      } else if (!isNaN(Number(amount))) {
        if (expense.cycle === '每3个月') {
          total += Number(amount) / 3;
        } else {
          total += Number(amount);
        }
      }
    });
    return Math.round(total);
  };

  const totalExpense = calculateTotalExpense();
  const balance = data.income - totalExpense;

  return (
    <div className="finance-info">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* 标题和总览 */}
        <div>
          <Title level={2}>💰 当前收支情报</Title>
          <Text type="secondary">管理您的订阅、投资和日常开支</Text>
        </div>

        {/* 收支总览 */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="当前月收入"
                value={data.income}
                precision={0}
                prefix="¥"
                suffix={
                  <Button
                    type="link"
                    size="small"
                    icon={<EditOutlined />}
                    onClick={() => openEditModal('income')}
                  />
                }
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="预计月支出"
                value={totalExpense}
                precision={0}
                prefix="¥"
                valueStyle={{ color: '#ff4d4f' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="可支配余额"
                value={balance}
                precision={0}
                prefix="¥"
                valueStyle={{ color: balance >= 0 ? '#1890ff' : '#ff4d4f' }}
              />
            </Card>
          </Col>
        </Row>

        {/* 已订阅服务 */}
        <Card
          title={
            <Space>
              <CreditCardOutlined />
              <span>已订阅服务</span>
            </Space>
          }
          extra={
            <Button
              type="primary"
              size="small"
              icon={<EditOutlined />}
              onClick={() => openEditModal('subscription')}
            >
              添加订阅
            </Button>
          }
        >
          <Row gutter={[16, 16]}>
            {data.subscriptions.map((sub) => (
              <Col xs={24} sm={12} lg={8} key={sub.id}>
                <Card
                  size="small"
                  className="item-card"
                  hoverable
                  onClick={() => openEditModal('subscription', sub)}
                >
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Space>
                      <ThunderboltOutlined style={{ color: '#1890ff' }} />
                      <Text strong>{sub.name}</Text>
                    </Space>
                    <Text type="secondary">
                      {sub.currency}
                      {sub.amount} / {sub.cycle}
                    </Text>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        </Card>

        {/* 投资策略 */}
        <Card
          title={
            <Space>
              <StockOutlined />
              <span>投资策略</span>
            </Space>
          }
          extra={
            <Button
              type="primary"
              size="small"
              icon={<EditOutlined />}
              onClick={() => openEditModal('investment')}
            >
              添加投资
            </Button>
          }
        >
          {['A股', 'NISA'].map((category) => (
            <div key={category} style={{ marginBottom: 24 }}>
              <Title level={5}>
                <Tag color="blue">{category}</Tag>
              </Title>
              <Row gutter={[16, 16]}>
                {data.investments
                  .filter((inv) => inv.category === category)
                  .map((inv) => (
                    <Col xs={24} sm={12} lg={8} key={inv.id}>
                      <Card
                        size="small"
                        className="item-card"
                        hoverable
                        onClick={() => openEditModal('investment', inv)}
                      >
                        <Space direction="vertical" style={{ width: '100%' }}>
                          <Space>
                            <RiseOutlined style={{ color: '#52c41a' }} />
                            <Text strong>{inv.name}</Text>
                          </Space>
                          <Text>
                            ¥{inv.amount} / {inv.cycle}
                          </Text>
                          {inv.note && (
                            <Text type="secondary" style={{ fontSize: 12 }}>
                              {inv.note}
                            </Text>
                          )}
                        </Space>
                      </Card>
                    </Col>
                  ))}
              </Row>
            </div>
          ))}
        </Card>

        {/* 每月花费 */}
        <Card
          title={
            <Space>
              <ShoppingOutlined />
              <span>每月花费明细</span>
            </Space>
          }
          extra={
            <Button
              type="primary"
              size="small"
              icon={<EditOutlined />}
              onClick={() => openEditModal('expense')}
            >
              添加支出
            </Button>
          }
        >
          <Row gutter={[16, 16]}>
            {data.expenses.map((expense) => (
              <Col xs={24} sm={12} lg={8} key={expense.id}>
                <Card
                  size="small"
                  className="item-card"
                  hoverable
                  onClick={() => openEditModal('expense', expense)}
                >
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Space>
                      <DollarOutlined style={{ color: '#faad14' }} />
                      <Text strong>{expense.name}</Text>
                    </Space>
                    <Text>¥{expense.amount}</Text>
                    <Space size="small">
                      <Tag color="orange">{expense.cycle}</Tag>
                      {expense.note && (
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {expense.note}
                        </Text>
                      )}
                    </Space>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        </Card>

        {/* 提示信息 */}
        <Card>
          <Space direction="vertical">
            <Text strong>💡 使用提示：</Text>
            <Text type="secondary">• 点击任意卡片即可编辑该项信息</Text>
            <Text type="secondary">• 所有数据保存在浏览器本地存储中</Text>
            <Text type="secondary">
              • 预计月支出会自动计算（含周期性支出的月均值）
            </Text>
          </Space>
        </Card>
      </Space>

      {/* 编辑弹窗 */}
      <Modal
        title={
          editType === 'income'
            ? '编辑收入'
            : editType === 'subscription'
            ? editingItem
              ? '编辑订阅'
              : '添加订阅'
            : editType === 'investment'
            ? editingItem
              ? '编辑投资'
              : '添加投资'
            : editingItem
            ? '编辑支出'
            : '添加支出'
        }
        open={editModalVisible}
        onOk={handleSave}
        onCancel={() => {
          setEditModalVisible(false);
          form.resetFields();
        }}
        okText="保存"
        cancelText="取消"
        footer={[
          editingItem && editType !== 'income' && (
            <Button
              key="delete"
              danger
              onClick={() => {
                handleDelete(editType as any, editingItem.id);
                setEditModalVisible(false);
              }}
            >
              删除
            </Button>
          ),
          <Button key="cancel" onClick={() => setEditModalVisible(false)}>
            取消
          </Button>,
          <Button key="save" type="primary" onClick={handleSave}>
            保存
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          {editType === 'income' ? (
            <Form.Item
              label="月收入"
              name="income"
              rules={[{ required: true, message: '请输入月收入' }]}
            >
              <InputNumber
                style={{ width: '100%' }}
                prefix="¥"
                min={0}
                placeholder="请输入月收入"
              />
            </Form.Item>
          ) : (
            <>
              {editType === 'investment' && (
                <Form.Item
                  label="分类"
                  name="category"
                  rules={[{ required: true, message: '请选择分类' }]}
                >
                  <Input placeholder="如：A股、NISA" />
                </Form.Item>
              )}

              <Form.Item
                label="名称"
                name="name"
                rules={[{ required: true, message: '请输入名称' }]}
              >
                <Input placeholder="请输入名称" />
              </Form.Item>

              <Form.Item
                label="金额"
                name="amount"
                rules={[{ required: true, message: '请输入金额' }]}
              >
                <Input placeholder="如：450 或 80000-130000" />
              </Form.Item>

              {editType === 'subscription' && (
                <Form.Item
                  label="货币"
                  name="currency"
                  rules={[{ required: true, message: '请输入货币符号' }]}
                >
                  <Input placeholder="如：¥ 或 $" />
                </Form.Item>
              )}

              <Form.Item
                label="周期"
                name="cycle"
                rules={[{ required: true, message: '请输入周期' }]}
              >
                <Input placeholder="如：每月、每年、每3个月" />
              </Form.Item>

              <Form.Item label="备注" name="note">
                <Input.TextArea rows={2} placeholder="选填：其他说明信息" />
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default FinanceInfo;
