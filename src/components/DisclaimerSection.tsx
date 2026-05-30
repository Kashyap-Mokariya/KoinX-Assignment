import { Info, ChevronUp, ChevronDown } from 'lucide-react'

interface DisclaimerSectionProps {
  expanded: boolean
  setExpanded: (expanded: boolean) => void
}

export function DisclaimerSection({ expanded, setExpanded }: DisclaimerSectionProps) {
  const disclaimers = [
    'Tax-loss harvesting is currently not allowed under Indian tax regulations. Please consult your tax advisor before making any decisions.',
    'Tax harvesting does not apply to derivatives or futures. These are handled separately as business income under tax rules.',
    'Price and market value data is fetched from Coingecko, not from individual exchanges. As a result, values may slightly differ from the ones on your exchange.',
    "Some countries do not have a short-term / long-term bifurcation. For now, we are calculating everything as long-term.",
    'Only realized losses are considered for harvesting. Unrealized losses in held assets are not counted.',
  ]

  return (
    <div className="border border-blue-600/40 rounded-lg bg-blue-900/20 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-4 py-4 flex items-center justify-between hover:bg-blue-900/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Info className="w-5 h-5 text-blue-400" />
          <span className="font-semibold text-white">Important Notes & Disclaimers</span>
        </div>
        {expanded ? (
          <ChevronUp className="w-5 h-5 text-blue-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-blue-400" />
        )}
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t border-blue-600/40 bg-blue-900/10">
          <ul className="space-y-3 text-gray-300 text-sm">
            {disclaimers.map((disclaimer, index) => (
              <li key={index} className="flex gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span>{disclaimer}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
