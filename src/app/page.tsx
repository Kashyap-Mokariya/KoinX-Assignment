'use client'

import { useState, useEffect } from 'react'
import { TaxHarvestingCard } from '@/components/TaxHarvestingCard'
import { DisclaimerSection } from '@/components/DisclaimerSection'
import { Tooltip } from '@/components/Tooltip'
import { CurrencyValue } from '@/components/CurrencyValue'

interface Holding {
  coin: string
  coinName: string
  logo: string
  currentPrice: number
  totalHolding: number
  averageBuyPrice: number
  stcg: {
    balance: number
    gain: number
  }
  ltcg: {
    balance: number
    gain: number
  }
}

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

const MOCK_CAPITAL_GAINS: CapitalGains = {
  stcg: {
    profits: 4049.48,
    losses: 32127.03,
  },
  ltcg: {
    profits: 0,
    losses: 0,
  },
}

const MOCK_HOLDINGS: Holding[] = [
  {
    coin: 'BTC',
    coinName: 'Bitcoin',
    logo: 'https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png',
    currentPrice: 104.39,
    totalHolding: 2218.81,
    averageBuyPrice: 85.32,
    stcg: { balance: 2218.8100, gain: 23000000 },
    ltcg: { balance: 0, gain: 0 },
  },
  {
    coin: 'ETH',
    coinName: 'Ethereum',
    logo: 'https://coin-images.coingecko.com/coins/images/279/large/ethereum.png',
    currentPrice: 1620.15,
    totalHolding: 5.6736,
    averageBuyPrice: 1620.15,
    stcg: { balance: 2.332, gain: 55320.15 },
    ltcg: { balance: 3.245, gain: 8239.29 },
  },
  {
    coin: 'USDT',
    coinName: 'Tether',
    logo: 'https://coin-images.coingecko.com/coins/images/325/large/Tether.png',
    currentPrice: 115,
    totalHolding: 3096.54,
    averageBuyPrice: 115,
    stcg: { balance: 2011.23, gain: -1200 },
    ltcg: { balance: 902.47, gain: 2400 },
  },
  {
    coin: 'MATIC',
    coinName: 'Polygon',
    logo: 'https://coin-images.coingecko.com/coins/images/4713/large/polygon.png',
    currentPrice: 2.31,
    totalHolding: 2210,
    averageBuyPrice: 2.31,
    stcg: { balance: 802, gain: -1200 },
    ltcg: { balance: 1402, gain: 2400 },
  },
  {
    coin: 'SOL',
    coinName: 'Solana',
    logo: 'https://coin-images.coingecko.com/coins/images/4128/large/solana.png',
    currentPrice: 142.75,
    totalHolding: 15.23,
    averageBuyPrice: 98.50,
    stcg: { balance: 8.5, gain: 12450.75 },
    ltcg: { balance: 6.73, gain: 5890.30 },
  },
  {
    coin: 'XRP',
    coinName: 'Ripple',
    logo: 'https://coin-images.coingecko.com/coins/images/44/large/xrp.png',
    currentPrice: 3.28,
    totalHolding: 8450,
    averageBuyPrice: 2.15,
    stcg: { balance: 4200, gain: -2150 },
    ltcg: { balance: 4250, gain: 9800.50 },
  },
]

type SortColumn = 'stcg' | 'ltcg' | null
type SortOrder = 'asc' | 'desc'

export default function Home() {
  const [selectedIndexes, setSelectedIndexes] = useState<Set<number>>(new Set())
  const [afterHarvestingGains, setAfterHarvestingGains] = useState<CapitalGains>(MOCK_CAPITAL_GAINS)
  const [expanded, setExpanded] = useState(true)
  const [sortColumn, setSortColumn] = useState<SortColumn>(null)
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')
  const [showAllHoldings, setShowAllHoldings] = useState(false)

  useEffect(() => {
    // Calculate new capital gains based on selected holdings
    let newGains = JSON.parse(JSON.stringify(MOCK_CAPITAL_GAINS))

    selectedIndexes.forEach((index) => {
      const holding = MOCK_HOLDINGS[index]

      // Handle STCG
      if (holding.stcg.gain > 0) {
        newGains.stcg.profits += holding.stcg.gain
      } else if (holding.stcg.gain < 0) {
        newGains.stcg.losses += Math.abs(holding.stcg.gain)
      }

      // Handle LTCG
      if (holding.ltcg.gain > 0) {
        newGains.ltcg.profits += holding.ltcg.gain
      } else if (holding.ltcg.gain < 0) {
        newGains.ltcg.losses += Math.abs(holding.ltcg.gain)
      }
    })

    console.log('Updated gains:', newGains)
    setAfterHarvestingGains(newGains)
  }, [selectedIndexes])

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIndexes(new Set(MOCK_HOLDINGS.map((_, i) => i)))
    } else {
      setSelectedIndexes(new Set())
    }
  }

  const handleSelectHolding = (index: number, checked: boolean) => {
    const newSelected = new Set(selectedIndexes)
    if (checked) {
      newSelected.add(index)
    } else {
      newSelected.delete(index)
    }
    setSelectedIndexes(newSelected)
  }

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      // Toggle sort order if same column clicked
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      // Set new column and default to descending
      setSortColumn(column)
      setSortOrder('desc')
    }
  }

  // Sort holdings based on selected column
  const sortedHoldings = [...MOCK_HOLDINGS].sort((a, b) => {
    if (!sortColumn) return 0

    let aValue: number
    let bValue: number

    if (sortColumn === 'stcg') {
      aValue = a.stcg.gain
      bValue = b.stcg.gain
    } else {
      aValue = a.ltcg.gain
      bValue = b.ltcg.gain
    }

    return sortOrder === 'asc' ? aValue - bValue : bValue - aValue
  })

  // Paginate holdings
  const displayedHoldings = showAllHoldings ? sortedHoldings : sortedHoldings.slice(0, 4)

  const preRealised =
    MOCK_CAPITAL_GAINS.stcg.profits -
    MOCK_CAPITAL_GAINS.stcg.losses +
    (MOCK_CAPITAL_GAINS.ltcg.profits - MOCK_CAPITAL_GAINS.ltcg.losses)

  const afterRealised =
    afterHarvestingGains.stcg.profits -
    afterHarvestingGains.stcg.losses +
    (afterHarvestingGains.ltcg.profits - afterHarvestingGains.ltcg.losses)

  const savings = preRealised - afterRealised
  const showSavings = savings > 0

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="text-3xl font-bold">
              <span className="text-blue-500">Koin</span>
              <span className="text-yellow-400">X</span>
              <span className="text-xs ml-1">®</span>
            </div>
          </div>

          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">
              Tax Harvesting{' '}
              <Tooltip
                content="Tax loss harvesting is an investment strategy where investors sell securities at a loss to offset capital gains. This reduces your overall tax liability. Harvested losses can be used to offset gains from the same or other assets, and can carry forward to future years if not fully used."
                side="bottom"
              >
                <a href="#" className="text-blue-400 hover:text-blue-300 text-sm font-normal ml-2">
                  How it works?
                </a>
              </Tooltip>
            </h1>
          </div>

          {/* Disclaimer Section */}
          <DisclaimerSection expanded={expanded} setExpanded={setExpanded} />
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <TaxHarvestingCard
            title="Pre Harvesting"
            gains={MOCK_CAPITAL_GAINS}
            realised={preRealised}
            isDark={true}
          />
          <TaxHarvestingCard
            title="After Harvesting"
            gains={afterHarvestingGains}
            realised={afterRealised}
            isDark={false}
            savings={showSavings ? savings : null}
          />
        </div>

        {/* Holdings Table Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Holdings</h2>
          <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800 bg-gray-800/50">
                  <th className="px-4 py-4 text-left w-12">
                    <input
                      type="checkbox"
                      checked={selectedIndexes.size === displayedHoldings.length && displayedHoldings.length > 0}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="w-4 h-4 cursor-pointer"
                    />
                  </th>
                  <th className="px-4 py-4 text-left">Asset</th>
                  <th className="px-4 py-4 text-left">Holdings
                    <br />
                    <span className="text-xs font-normal text-gray-400">Current Market Rate</span>
                  </th>
                  <th className="px-4 py-4 text-left">Current Value</th>
                  <th
                    className="px-4 py-4 text-left cursor-pointer hover:text-blue-400 transition-colors"
                    onClick={() => handleSort('stcg')}
                  >
                    Short-term
                    {sortColumn === 'stcg' && (
                      <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th
                    className="px-4 py-4 text-left cursor-pointer hover:text-blue-400 transition-colors"
                    onClick={() => handleSort('ltcg')}
                  >
                    Long-Term
                    {sortColumn === 'ltcg' && (
                      <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th className="px-4 py-4 text-left">Amount to Sell</th>
                </tr>
              </thead>
              <tbody>
                {displayedHoldings.map((holding, displayIndex) => {
                  // Find original index in MOCK_HOLDINGS
                  const originalIndex = MOCK_HOLDINGS.indexOf(holding)
                  const isSelected = selectedIndexes.has(originalIndex)
                  const currentValue = holding.totalHolding * holding.currentPrice

                  return (
                    <tr
                      key={displayIndex}
                      className={`border-b border-gray-800 transition-colors ${isSelected ? 'bg-blue-900/40' : 'hover:bg-gray-800/30'
                        }`}
                    >
                      <td className="px-4 py-4">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) =>
                            handleSelectHolding(originalIndex, e.target.checked)
                          }
                          className="w-4 h-4 cursor-pointer"
                        />
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={holding.logo}
                            alt={holding.coin}
                            className="w-6 h-6 rounded-full"
                          />
                          <div>
                            <div className="font-medium">{holding.coinName}</div>
                            <div className="text-xs text-gray-400">{holding.coin}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div>
                          <div className="font-medium">{holding.totalHolding.toFixed(4)} {holding.coin}</div>
                          <div className="text-xs text-gray-400">$ {holding.currentPrice.toFixed(2)}/{holding.coin}</div>
                        </div>
                      </td>
                      <td className="px-4 py-4 font-medium">
                        <CurrencyValue value={currentValue} />
                      </td>
                      <td className="px-4 py-4">
                        <div className={holding.stcg.gain >= 0 ? 'text-green-400' : 'text-red-400'}>
                          <CurrencyValue value={holding.stcg.gain} showSign={true} />
                        </div>
                        <div className="text-xs text-gray-400">
                          {holding.stcg.balance.toFixed(3)} {holding.coin}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className={holding.ltcg.gain >= 0 ? 'text-green-400' : 'text-red-400'}>
                          <CurrencyValue value={holding.ltcg.gain} showSign={true} />
                        </div>
                        <div className="text-xs text-gray-400">
                          {holding.ltcg.balance.toFixed(3)} {holding.coin}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-gray-400">
                        {isSelected ? `${holding.totalHolding.toFixed(4)} ${holding.coin}` : '-'}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          {MOCK_HOLDINGS.length > 4 && (
            <div className="mt-4">
              <button
                onClick={() => setShowAllHoldings(!showAllHoldings)}
                className="text-blue-400 hover:text-blue-300 text-sm font-medium cursor-pointer"
              >
                {showAllHoldings ? 'View less' : 'View all'}
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
