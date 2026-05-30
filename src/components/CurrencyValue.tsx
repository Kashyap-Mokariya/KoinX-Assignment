'use client'

import { useState } from 'react'
import { formatCurrency, formatFullCurrency } from '@/utils/formatCurrency'

interface CurrencyValueProps {
  value: number
  className?: string
  prefix?: string
  showSign?: boolean
}

export function CurrencyValue({
  value,
  className = '',
  prefix = '$',
  showSign = false,
}: CurrencyValueProps) {
  const [isVisible, setIsVisible] = useState(false)
  const isNegative = value < 0
  const absoluteValue = Math.abs(value)
  const sign = showSign ? (value >= 0 ? '+' : '-') : isNegative ? '-' : ''

  return (
    <div className="relative inline-block group">
      <span
        className={className}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {sign} {prefix} {formatCurrency(absoluteValue)}
      </span>

      {isVisible && (
        <div className="absolute bottom-full mb-2 whitespace-nowrap bg-white text-gray-900 text-xs rounded-md px-3 py-2 z-50 pointer-events-none shadow-xl border border-gray-200 font-medium left-1/2 -translate-x-1/2">
          {sign} {prefix} {formatFullCurrency(absoluteValue)}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border border-gray-200 rotate-45" />
        </div>
      )}
    </div>
  )
}
