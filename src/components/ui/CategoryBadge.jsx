import { cn } from '../../utils/cn'

const CATEGORY_COLORS = {
  Housing: 'bg-[#6366f1]/10 text-[#6366f1]',
  'Food & Dining': 'bg-[#f97316]/10 text-[#f97316]',
  Transport: 'bg-[#0ea5e9]/10 text-[#0ea5e9]',
  Shopping: 'bg-[#ec4899]/10 text-[#ec4899]',
  Entertainment: 'bg-[#8b5cf6]/10 text-[#8b5cf6]',
  Healthcare: 'bg-[#10b981]/10 text-[#10b981]',
  Utilities: 'bg-[#64748b]/10 text-[#64748b]',
  Income: 'bg-[var(--color-green-bg)] text-[var(--color-green)]',
  Savings: 'bg-[#1d4ed8]/10 text-[#1d4ed8]',
  Other: 'bg-[#a1a1aa]/10 text-[#a1a1aa]',
}

export default function CategoryBadge({ category, className }) {
  const colorClass = CATEGORY_COLORS[category] || CATEGORY_COLORS.Other
  
  return (
    <span className={cn("px-2 py-0.5 rounded text-[11px] font-medium whitespace-nowrap", colorClass, className)}>
      {category}
    </span>
  )
}
