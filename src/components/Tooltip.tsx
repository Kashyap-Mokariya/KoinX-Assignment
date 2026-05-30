'use client'

import { useState } from 'react'

interface TooltipProps {
  content: string
  children: React.ReactNode
  side?: 'top' | 'bottom' | 'left' | 'right'
}

export function Tooltip({ content, children, side = 'bottom' }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  // positioning logic - adjust as needed for different screens
  const sideClasses = {
    top: 'bottom-full mb-2',
    bottom: 'top-full mt-2',
    left: 'right-full mr-2',
    right: 'left-full ml-2',
  }

  return (
    <div className="relative inline-block group">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>

      {isVisible && (
        <div
          className={`absolute ${sideClasses[side]} whitespace-nowrap bg-white text-gray-900 text-xs rounded-md px-3 py-2 z-50 pointer-events-none shadow-xl border border-gray-200 font-medium`}
        >
          {content}
          {/* Arrow */}
          <div
            className={`absolute w-2 h-2 bg-white border border-gray-200 ${side === 'bottom'
                ? '-top-1 left-1/2 -translate-x-1/2 rotate-45'
                : side === 'top'
                  ? '-bottom-1 left-1/2 -translate-x-1/2 rotate-45'
                  : side === 'right'
                    ? '-left-1 top-1/2 -translate-y-1/2 rotate-45'
                    : '-right-1 top-1/2 -translate-y-1/2 rotate-45'
              }`}
          />
        </div>
      )}
    </div>
  )
}
