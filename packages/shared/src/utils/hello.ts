/**
 * 示例工具函数
 * @returns 问候消息
 */
export function hello(): string {
  return "Hello from shared utils!";
}

/**
 * 格式化货币
 * @param amount 金额
 * @param currency 货币符号
 * @returns 格式化后的货币字符串
 */
export function formatCurrency(amount: number, currency: string = '¥'): string {
  return `${currency}${amount.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/**
 * 格式化日期
 * @param date 日期对象或时间戳
 * @returns 格式化后的日期字符串
 */
export function formatDate(date: Date | number): string {
  const d = typeof date === 'number' ? new Date(date) : date;
  return d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
}

