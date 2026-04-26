import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

export default function BudgetBar({ spent, budgeted, color = 'var(--color-blue)', className }) {
  const percentage = Math.min(Math.round((spent / budgeted) * 100), 100)
  const isOver = spent > budgeted
  const isNear = percentage >= 85 && !isOver

  const barColor = isOver ? 'var(--color-red)' : isNear ? 'var(--color-amber)' : color

  return (
    <div className={cn("w-full h-2.5 bg-[var(--color-bg-base)] rounded-full overflow-hidden", className)}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="h-full rounded-full"
        style={{ backgroundColor: barColor }}
      />
    </div>
  )
}
