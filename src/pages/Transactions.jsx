import { useState, useMemo } from 'react'
import { useFinanceStore } from '../store/useFinanceStore'
import { formatCurrency } from '../utils/formatters'
import TransactionRow from '../components/ui/TransactionRow'
import { Download, Search, Filter } from 'lucide-react'
import { format } from 'date-fns'

export default function Transactions() {
  const { transactions } = useFinanceStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('All')
  
  const filteredTransactions = useMemo(() => {
    return transactions.filter(tx => {
      const matchesSearch = tx.merchant.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = filterType === 'All' ? true : 
                          filterType === 'Income' ? tx.type === 'credit' : tx.type === 'debit'
      return matchesSearch && matchesType
    })
  }, [transactions, searchTerm, filterType])

  const totalIncome = filteredTransactions.filter(tx => tx.type === 'credit').reduce((acc, tx) => acc + tx.amount, 0)
  const totalExpense = filteredTransactions.filter(tx => tx.type === 'debit').reduce((acc, tx) => acc + Math.abs(tx.amount), 0)

  // Group by date
  const grouped = useMemo(() => {
    const groups = {}
    filteredTransactions.forEach(tx => {
      const dateKey = format(new Date(tx.date), 'MMM d, yyyy')
      if (!groups[dateKey]) groups[dateKey] = []
      groups[dateKey].push(tx)
    })
    return groups
  }, [filteredTransactions])

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="font-heading font-extrabold text-3xl tracking-tighter">Transactions</h1>
        <button className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-2 hover:bg-[var(--color-bg-hover)] transition-colors self-start">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      {/* Filter bar */}
      <div className="flex flex-col md:flex-row gap-4 p-4 bg-[var(--color-bg-card)] rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-sm)]">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
          <input 
            type="text" 
            placeholder="Search merchants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[var(--color-bg-base)] border border-[var(--color-border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-shadow"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          <select className="bg-[var(--color-bg-base)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm focus:outline-none">
            <option>This Month</option>
            <option>Last Month</option>
            <option>Last 3 Months</option>
          </select>
          <select 
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-[var(--color-bg-base)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm focus:outline-none"
          >
            <option>All</option>
            <option>Income</option>
            <option>Expenses</option>
          </select>
          <button className="p-2 border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-base)] hover:bg-[var(--color-bg-hover)]">
            <Filter className="w-4 h-4 text-[var(--color-text-muted)]" />
          </button>
        </div>
      </div>

      {/* Summary bar */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--color-text-muted)] px-1">
        <span>{filteredTransactions.length} transactions</span>
        <span className="hidden md:inline text-[var(--color-border-strong)]">·</span>
        <span>Income: <span className="text-[var(--color-green)] font-medium">{formatCurrency(totalIncome)}</span></span>
        <span className="hidden md:inline text-[var(--color-border-strong)]">·</span>
        <span>Expenses: <span className="text-[var(--color-text-primary)] font-medium">{formatCurrency(totalExpense)}</span></span>
        <span className="hidden md:inline text-[var(--color-border-strong)]">·</span>
        <span>Net: <span className="font-medium text-[var(--color-text-primary)]">{formatCurrency(totalIncome - totalExpense)}</span></span>
      </div>

      {/* Transaction table */}
      <div className="bg-[var(--color-bg-card)] rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-sm)] overflow-hidden">
        {Object.entries(grouped).map(([dateStr, txs]) => (
          <div key={dateStr}>
            <div className="bg-[var(--color-bg-hover)] px-4 py-2 text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider border-b border-[var(--color-border)]">
              {dateStr}
            </div>
            <div>
              {txs.map(tx => (
                <TransactionRow key={tx.id} transaction={tx} />
              ))}
            </div>
          </div>
        ))}
        {filteredTransactions.length === 0 && (
          <div className="p-12 text-center text-[var(--color-text-muted)]">
            No transactions found matching your filters.
          </div>
        )}
      </div>
    </div>
  )
}
