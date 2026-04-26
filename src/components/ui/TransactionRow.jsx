import { format } from 'date-fns'
import { formatCurrency } from '../../utils/formatters'
import { cn } from '../../utils/cn'
import CategoryBadge from './CategoryBadge'
import { Utensils, Ticket, Car, ShoppingBag, Home, HeartPulse, Zap, DollarSign, ArrowRightLeft } from 'lucide-react'

export default function TransactionRow({ transaction, onClick }) {
  const isIncome = transaction.type === 'credit'
  const isPending = transaction.status === 'pending'
  
  const getIcon = (category) => {
    switch (category) {
      case 'Food & Dining': return <Utensils className="w-4 h-4" />
      case 'Entertainment': return <Ticket className="w-4 h-4" />
      case 'Transport': return <Car className="w-4 h-4" />
      case 'Shopping': return <ShoppingBag className="w-4 h-4" />
      case 'Housing': return <Home className="w-4 h-4" />
      case 'Healthcare': return <HeartPulse className="w-4 h-4" />
      case 'Utilities': return <Zap className="w-4 h-4" />
      case 'Income': return <DollarSign className="w-4 h-4" />
      default: return <ArrowRightLeft className="w-4 h-4" />
    }
  }

  return (
    <div 
      onClick={onClick}
      className={cn(
        "flex items-center justify-between p-3 md:p-4 border-b border-[var(--color-border)]",
        "hover:bg-[var(--color-bg-hover)] transition-colors cursor-pointer group"
      )}
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-[var(--color-bg-base)] flex items-center justify-center text-[var(--color-text-muted)] border border-[var(--color-border)]">
          {getIcon(transaction.category)}
        </div>
        <div>
          <p className="text-sm font-medium text-[var(--color-text-primary)]">
            {transaction.merchant}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[11px] text-[var(--color-text-dim)] tabular-nums">
              {format(new Date(transaction.date), 'MMM d')}
            </span>
            <span className="text-[11px] text-[var(--color-text-dim)] hidden md:inline">·</span>
            <span className="text-[11px] text-[var(--color-text-dim)] hidden md:inline">
              {transaction.account}
            </span>
            <CategoryBadge category={transaction.category} className="hidden sm:inline-flex" />
          </div>
        </div>
      </div>
      
      <div className="text-right">
        <p className={cn(
          "text-sm font-medium tabular-nums",
          isIncome ? "text-[var(--color-green)]" : "text-[var(--color-text-primary)]"
        )}>
          {isIncome ? '+' : '-'}{formatCurrency(Math.abs(transaction.amount))}
        </p>
        {isPending && (
          <p className="text-[11px] font-medium text-[var(--color-amber)] mt-1 italic">
            Pending
          </p>
        )}
      </div>
    </div>
  )
}
