import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'
import { useFinanceStore } from '../../store/useFinanceStore'
import { formatCurrency } from '../../utils/formatters'

export default function CashFlowChart() {
  const budgets = useFinanceStore(state => state.budgets)
  const theme = useFinanceStore(state => state.theme)
  
  const textColor = theme === 'dark' ? '#9ca3af' : '#6b7280'
  const gridColor = theme === 'dark' ? '#2a2a32' : '#e5e7eb'

  const data = budgets.map(b => ({
    name: b.category,
    budgeted: b.budgeted,
    spent: b.spent,
    remaining: Math.max(0, b.budgeted - b.spent),
    over: Math.max(0, b.spent - b.budgeted),
    isOver: b.spent > b.budgeted,
    isNear: (b.spent / b.budgeted) >= 0.85 && b.spent <= b.budgeted
  }))

  return (
    <div className="w-full h-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 10, left: 10, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: textColor, fontSize: 11 }}
            dy={10}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: textColor, fontSize: 11 }}
            tickFormatter={(value) => `$${value}`}
            dx={-10}
          />
          <Tooltip 
            formatter={(value) => formatCurrency(value)}
            contentStyle={{ 
              backgroundColor: 'var(--color-bg-surface)', 
              borderColor: 'var(--color-border)',
              borderRadius: '8px',
              boxShadow: 'var(--shadow-card)',
              color: 'var(--color-text-primary)'
            }}
            cursor={{ fill: 'var(--color-bg-hover)' }}
          />
          <Legend wrapperStyle={{ fontSize: '12px', color: textColor, paddingTop: '10px' }} />
          <Bar dataKey="spent" name="Spent" stackId="a" radius={[0, 0, 4, 4]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.isOver ? 'var(--color-red)' : entry.isNear ? 'var(--color-amber)' : 'var(--color-green)'} />
            ))}
          </Bar>
          <Bar dataKey="remaining" name="Remaining Budget" stackId="a" fill="var(--color-bg-base)" radius={[4, 4, 0, 0]} stroke="var(--color-border)" strokeDasharray="2 2" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
