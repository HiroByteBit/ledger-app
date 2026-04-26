import { formatCurrency, formatPercent } from '../../utils/formatters'
import { motion } from 'framer-motion'

export default function GoalCard({ goal }) {
  const percentage = Math.min(Math.round((goal.currentAmount / goal.targetAmount) * 100), 100)
  
  return (
    <div className="min-w-[280px] p-5 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-[var(--shadow-sm)]">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-[14px]">{goal.title}</h3>
        <span className="text-xs font-medium text-[var(--color-text-muted)] bg-[var(--color-bg-base)] px-2 py-1 rounded">
          {percentage}%
        </span>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between items-end mb-2">
          <span className="text-xl font-bold tabular-nums">
            {formatCurrency(goal.currentAmount, true)}
          </span>
          <span className="text-xs text-[var(--color-text-muted)] tabular-nums">
            of {formatCurrency(goal.targetAmount, true)}
          </span>
        </div>
        <div className="w-full h-2 bg-[var(--color-bg-base)] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full rounded-full bg-[var(--color-accent)]"
          />
        </div>
      </div>
      
      <div className="text-[11px] text-[var(--color-text-dim)]">
        Target: {new Date(goal.deadline).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
      </div>
    </div>
  )
}
