import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { useFinanceStore } from '../../store/useFinanceStore'
import { formatPercent } from '../../utils/formatters'

const ALLOCATION_COLORS = {
  'US Stocks': '#3b82f6',
  'International': '#8b5cf6',
  'Bonds': '#10b981',
  'Real Estate': '#f59e0b',
  'Cash': '#64748b'
}

export default function AllocationChart() {
  const investments = useFinanceStore(state => state.investments)
  
  const allocationMap = investments.reduce((acc, inv) => {
    acc[inv.assetClass] = (acc[inv.assetClass] || 0) + inv.marketValue
    return acc
  }, {})
  
  const totalValue = Object.values(allocationMap).reduce((a, b) => a + b, 0)
  
  const data = Object.entries(allocationMap).map(([name, value]) => ({
    name,
    value,
    percentage: (value / totalValue) * 100,
    color: ALLOCATION_COLORS[name] || '#a1a1aa'
  })).sort((a, b) => b.value - a.value)

  return (
    <div className="w-full h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value, name, props) => [`${formatPercent(props.payload.percentage)}`, name]}
            contentStyle={{ 
              backgroundColor: 'var(--color-bg-surface)', 
              borderColor: 'var(--color-border)',
              borderRadius: '8px',
              boxShadow: 'var(--shadow-card)',
              color: 'var(--color-text-primary)'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
