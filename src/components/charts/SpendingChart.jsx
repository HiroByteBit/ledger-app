import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { useFinanceStore } from '../../store/useFinanceStore'
import { formatCurrency } from '../../utils/formatters'

const COLORS = {
  Housing: '#6366f1',
  'Food & Dining': '#f97316',
  Transport: '#0ea5e9',
  Shopping: '#ec4899',
  Entertainment: '#8b5cf6',
  Healthcare: '#10b981',
  Utilities: '#64748b',
  Income: '#059669',
  Savings: '#1d4ed8',
  Other: '#a1a1aa'
}

export default function SpendingChart() {
  const budgets = useFinanceStore(state => state.budgets)
  const data = budgets.filter(b => b.category !== 'Savings' && b.spent > 0).map(b => ({
    name: b.category,
    value: b.spent,
    color: COLORS[b.category] || COLORS.Other
  }))
  
  const total = data.reduce((acc, item) => acc + item.value, 0)

  return (
    <div className="w-full h-[300px] relative">
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-xs text-[var(--color-text-muted)] font-medium">Total Spent</span>
        <span className="text-2xl font-bold text-[var(--color-text-primary)] tabular-nums">
          {formatCurrency(total)}
        </span>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={85}
            outerRadius={110}
            paddingAngle={2}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => formatCurrency(value)}
            contentStyle={{ 
              backgroundColor: 'var(--color-bg-surface)', 
              borderColor: 'var(--color-border)',
              borderRadius: '8px',
              boxShadow: 'var(--shadow-card)',
              color: 'var(--color-text-primary)'
            }}
            itemStyle={{ color: 'var(--color-text-primary)' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
