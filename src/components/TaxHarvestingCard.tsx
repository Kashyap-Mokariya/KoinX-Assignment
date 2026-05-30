import { Zap } from 'lucide-react'
import { CurrencyValue } from './CurrencyValue'

interface CapitalGains {
  stcg: {
    profits: number
    losses: number
  }
  ltcg: {
    profits: number
    losses: number
  }
}

interface TaxHarvestingCardProps {
  title: string
  gains: CapitalGains
  realised: number
  isDark: boolean
  savings?: number | null
}

export function TaxHarvestingCard({
  title,
  gains,
  realised,
  isDark,
  savings,
}: TaxHarvestingCardProps) {
  const stcgNet = gains.stcg.profits - gains.stcg.losses
  const ltcgNet = gains.ltcg.profits - gains.ltcg.losses

  if (isDark) {
    return (
      <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-6 text-white">{title}</h3>

        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400 text-xs mb-3">Short-term</p>
              <p className="text-gray-500 text-xs mb-1">Profits</p>
              <CurrencyValue value={gains.stcg.profits} className="text-white text-base font-semibold" />
            </div>
            <div>
              <p className="text-gray-400 text-xs mb-3">Long-term</p>
              <p className="text-gray-500 text-xs mb-1">Profits</p>
              <CurrencyValue value={gains.ltcg.profits} className="text-white text-base font-semibold" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500 text-xs mb-1">Losses</p>
              <CurrencyValue value={gains.stcg.losses} prefix="- $" className="text-white text-base font-semibold" />
            </div>
            <div>
              <p className="text-gray-500 text-xs mb-1">Losses</p>
              <CurrencyValue value={gains.ltcg.losses} prefix="- $" className="text-white text-base font-semibold" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500 text-xs mb-1">Net Capital Gains</p>
              <CurrencyValue value={stcgNet} className="text-white text-base font-semibold" showSign={true} />
            </div>
            <div>
              <p className="text-gray-500 text-xs mb-1">Net Capital Gains</p>
              <CurrencyValue value={ltcgNet} className="text-white text-base font-semibold" showSign={true} />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-4">
          <div className="flex justify-between items-baseline gap-4">
            <span className="text-white font-medium">Realised Capital Gains:</span>
            <CurrencyValue value={realised} className="text-white text-2xl font-bold whitespace-nowrap" showSign={true} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-blue-500 rounded-lg p-6 text-white">
      <h3 className="text-xl font-bold mb-6">{title}</h3>

      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-blue-100 text-xs mb-3">Short-term</p>
            <p className="text-blue-100/70 text-xs mb-1">Profits</p>
            <CurrencyValue value={gains.stcg.profits} className="text-white text-base font-semibold" />
          </div>
          <div>
            <p className="text-blue-100 text-xs mb-3">Long-term</p>
            <p className="text-blue-100/70 text-xs mb-1">Profits</p>
            <CurrencyValue value={gains.ltcg.profits} className="text-white text-base font-semibold" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-blue-100/70 text-xs mb-1">Losses</p>
            <CurrencyValue value={gains.stcg.losses} prefix="- $" className="text-white text-base font-semibold" />
          </div>
          <div>
            <p className="text-blue-100/70 text-xs mb-1">Losses</p>
            <CurrencyValue value={gains.ltcg.losses} prefix="- $" className="text-white text-base font-semibold" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-blue-100/70 text-xs mb-1">Net Capital Gains</p>
            <CurrencyValue value={stcgNet} className="text-white text-base font-semibold" showSign={true} />
          </div>
          <div>
            <p className="text-blue-100/70 text-xs mb-1">Net Capital Gains</p>
            <CurrencyValue value={ltcgNet} className="text-white text-base font-semibold" showSign={true} />
          </div>
        </div>
      </div>

      <div className="border-t border-blue-400/30 pt-4 mb-4">
        <div className="flex justify-between items-baseline gap-4">
          <span className="text-white font-medium">Effective Capital Gains:</span>
          <CurrencyValue value={realised} className="text-white text-2xl font-bold whitespace-nowrap" showSign={true} />
        </div>
      </div>

      {savings != null && (
        <div className="bg-blue-600/60 rounded px-3 py-2 flex items-center gap-2">
          <Zap className="w-4 h-4 text-yellow-300 shrink-0" />
          <span className="text-white text-sm">
            You are going to save upto <CurrencyValue value={savings} />
          </span>
        </div>
      )}
    </div>
  )
}
