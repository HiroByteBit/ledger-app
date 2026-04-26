import { formatCurrency } from '../../utils/formatters'
import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'
import { Landmark, CreditCard, TrendingUp, Car, Bitcoin, Wallet } from 'lucide-react'

export default function AccountCard({ account, onClick }) {
  const isLiability = account.type === 'liability'
  
  const getIcon = (category) => {
    switch (category) {
      case 'Cash': return <Wallet className="w-5 h-5" />
      case 'Credit': return <CreditCard className="w-5 h-5" />
      case 'Investment': return <TrendingUp className="w-5 h-5" />
      case 'Loan': return <Car className="w-5 h-5" />
      case 'Crypto': return <Bitcoin className="w-5 h-5" />
      default: return <Landmark className="w-5 h-5" />
    }
  }

  return (
    <motion.div 
      whileHover={{ y: -2 }}
      onClick={onClick}
      className={cn(
        "min-w-[240px] p-4 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)]",
        "shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-card)] transition-all cursor-pointer",
        "flex flex-col gap-3"
      )}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[var(--color-bg-hover)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-primary)]">
            {getIcon(account.category)}
          </div>
          <div>
            <h3 className="text-[14px] font-medium text-[var(--color-text-primary)]">{account.name}</h3>
            <p className="text-[12px] text-[var(--color-text-muted)]">{account.institution}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-2">
        <div className={cn(
          "text-xl font-semibold tabular-nums tracking-tight",
          isLiability ? "text-[var(--color-red)]" : 
          account.category === 'Investment' ? "text-[var(--color-blue)]" : 
          account.category === 'Crypto' ? "text-[var(--color-amber)]" : "text-[var(--color-green)]"
        )}>
          {formatCurrency(account.balance)}
        </div>
        {account.dayChange !== undefined && (
          <div className={cn(
            "text-xs font-medium mt-1 flex items-center gap-1",
            account.dayChange >= 0 ? "text-[var(--color-green)]" : "text-[var(--color-red)]"
          )}>
            {account.dayChange >= 0 ? '+' : ''}{formatCurrency(account.dayChange)} today
          </div>
        )}
      </div>
    </motion.div>
  )
}
