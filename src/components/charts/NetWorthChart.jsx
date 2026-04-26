import { useFinanceStore } from '../../store/useFinanceStore'
import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts'
import { formatCurrency, formatNumber } from '../../utils/formatters'

export default function NetWorthChart() {
  const data = useFinanceStore(state => state.netWorthHistory)
  const theme = useFinanceStore(state => state.theme)
  
  const textColor = theme === 'dark' ? '#9ca3af' : '#6b7280'
  const gridColor = theme === 'dark' ? '#2a2a32' : '#e5e7eb'

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 10, right: 0, left: 20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorAssets" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-blue)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="var(--color-blue)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
          <XAxis 
            dataKey="date" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: textColor, fontSize: 10 }}
            dy={10}
            minTickGap={30}
          />
          <YAxis 
            yAxisId="left"
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: textColor, fontSize: 10 }}
            tickFormatter={(value) => `$${formatNumber(value / 1000)}k`}
            width={40}
          />
          <Tooltip
            contentStyle={{ 
              backgroundColor: 'var(--color-bg-surface)', 
              borderColor: 'var(--color-border)',
              borderRadius: '8px',
              boxShadow: 'var(--shadow-card)',
              color: 'var(--color-text-primary)'
            }}
            formatter={(value) => [formatCurrency(value), undefined]}
            labelStyle={{ color: 'var(--color-text-muted)', marginBottom: '4px' }}
          />
          <ReferenceLine y={0} yAxisId="left" stroke={gridColor} />
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="assets"
            name="Assets"
            stroke="var(--color-blue)"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorAssets)"
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="netWorth"
            name="Net Worth"
            stroke="var(--color-accent)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: 'var(--color-accent)' }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
