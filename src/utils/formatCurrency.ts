/**
 * Format a number to human-readable currency format
 * Examples: 50000 -> 50k, 1500000 -> 1.5M, 2000000000 -> 2B
 */
export function formatCurrency(value: number): string {
  if (value === 0) return '0'
  
  const absValue = Math.abs(value)
  const isNegative = value < 0
  
  let formatted: string
  
  if (absValue >= 1000000000) {
    // Billions
    formatted = (absValue / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B'
  } else if (absValue >= 1000000) {
    // Millions
    formatted = (absValue / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
  } else if (absValue >= 1000) {
    // Thousands
    formatted = (absValue / 1000).toFixed(1).replace(/\.0$/, '') + 'k'
  } else {
    // Less than 1000
    formatted = absValue.toFixed(2).replace(/\.00$/, '')
  }
  
  return isNegative ? '-' + formatted : formatted
}

/**
 * Format a number to US dollar format with full precision
 */
export function formatFullCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}
