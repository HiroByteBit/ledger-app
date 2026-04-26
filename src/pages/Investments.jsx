import { useFinanceStore } from '../store/useFinanceStore'
import { formatCurrency, formatPercent } from '../utils/formatters'
import AllocationChart from '../components/charts/AllocationChart'
import { TrendingUp, TrendingDown, Info } from 'lucide-react'
import { cn } from '../utils/cn'

export default function Investments() {
  const { investments } = useFinanceStore()
  
  const totalValue = investments.reduce((acc, inv) => acc + inv.marketValue, 0)
  const dayChange = investments.reduce((acc, inv) => acc + inv.dayChange, 0)
  const dayChangePct = dayChange / (totalValue - dayChange)
  const totalGain = investments.reduce((acc, inv) => acc + inv.totalGain, 0)
  const totalGainPct = totalGain / (totalValue - totalGain)

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-3xl tracking-tighter mb-2">Investments</h1>
          <p className="text-sm text-[var(--color-text-muted)]">Brokerage and retirement accounts.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* A. Portfolio Summary */}
          <div className="bg-[var(--color-bg-card)] rounded-xl border border-[var(--color-border)] p-6 shadow-[var(--shadow-sm)] flex justify-between items-center">
            <div>
              <p className="text-[12px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Total Value</p>
              <p className="font-heading font-extrabold text-[32px] leading-none tracking-[-0.03em]">{formatCurrency(totalValue)}</p>
            </div>
            <div className="text-right">
              <p className="text-[12px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Total Return</p>
              <div className="flex items-center justify-end gap-1 font-bold text-[18px]">
                <span className={totalGain >= 0 ? "text-[var(--color-green)]" : "text-[var(--color-red)]"}>
                  {totalGain >= 0 ? '+' : ''}{formatCurrency(totalGain)}
                </span>
              </div>
              <span className={cn("text-sm font-medium", totalGain >= 0 ? "text-[var(--color-green)]" : "text-[var(--color-red)]")}>
                {totalGainPct >= 0 ? '+' : ''}{formatPercent(totalGainPct * 100)} All time
              </span>
            </div>
          </div>

          {/* C. Holdings Table */}
          <div className="bg-[var(--color-bg-card)] rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-sm)] overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[var(--color-bg-hover)] border-b border-[var(--color-border)]">
                  <th className="px-4 py-3 text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Symbol</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Shares</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Price</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Total Value</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Today</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Total Return</th>
                </tr>
              </thead>
              <tbody className="divide-y border-[var(--color-border)]">
                {investments.map((inv) => (
                  <tr key={inv.symbol} className="hover:bg-[var(--color-bg-hover)] transition-colors group cursor-pointer">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-sm">{inv.symbol}</div>
                      <div className="text-[11px] text-[var(--color-text-muted)] truncate max-w-[120px]">{inv.name}</div>
                    </td>
                    <td className="px-4 py-3 text-sm tabular-nums">{inv.shares}</td>
                    <td className="px-4 py-3 text-sm tabular-nums">{formatCurrency(inv.currentPrice)}</td>
                    <td className="px-4 py-3 font-semibold text-sm tabular-nums">{formatCurrency(inv.marketValue)}</td>
                    <td className="px-4 py-3 text-sm tabular-nums">
                      <div className={cn("flex items-center gap-1 font-medium", inv.dayChange >= 0 ? "text-[var(--color-green)]" : "text-[var(--color-red)]")}>
                        {inv.dayChange >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {formatPercent(inv.dayChangePct)}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm tabular-nums font-semibold">
                      <span className={inv.totalGain >= 0 ? "text-[var(--color-green)]" : "text-[var(--color-red)]"}>
                        {inv.totalGain >= 0 ? '+' : ''}{formatCurrency(inv.totalGain)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Allocation & Rebalancing */}
        <div className="space-y-6">
          <div className="bg-[var(--color-bg-card)] rounded-xl border border-[var(--color-border)] p-6 shadow-[var(--shadow-sm)]">
            <h2 className="text-[13px] font-semibold text-[var(--color-text-primary)] tracking-[-0.01em] mb-4">ASSET ALLOCATION</h2>
            <AllocationChart />
            <div className="mt-4 space-y-2">
              {['US Stocks', 'International', 'Bonds', 'Real Estate'].map(ac => {
                const total = investments.filter(i => i.assetClass === ac).reduce((sum, i) => sum + i.marketValue, 0)
                if(total === 0) return null
                return (
                  <div key={ac} className="flex justify-between text-xs">
                    <span className="text-[var(--color-text-muted)]">{ac}</span>
                    <span className="font-medium tabular-nums">{formatPercent((total/totalValue)*100)}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="bg-[var(--color-blue-bg)] rounded-xl border border-[#93c5fd] p-5">
            <div className="flex items-start gap-3 text-[var(--color-blue)] mb-3">
              <Info className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-sm">Consider Rebalancing</h3>
                <p className="text-xs mt-1 leading-relaxed opacity-90">
                  Your portfolio is currently <strong>82% stocks</strong>, which exceeds your target allocation of 70%. Consider redirecting new funds to bonds to rebalance.
                </p>
              </div>
            </div>
            <button className="w-full py-2 bg-white/50 hover:bg-white/80 text-[var(--color-blue)] rounded-lg text-xs font-semibold transition-colors">
              Review Targets
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
