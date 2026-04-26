import { useFinanceStore } from '../store/useFinanceStore'
import { formatCurrency, formatPercent } from '../utils/formatters'
import { useCountUp } from '../hooks/useCountUp'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowRight, TrendingUp, TrendingDown, Wallet } from 'lucide-react'

import NetWorthChart from '../components/charts/NetWorthChart'
import SpendingChart from '../components/charts/SpendingChart'
import AccountCard from '../components/ui/AccountCard'
import TransactionRow from '../components/ui/TransactionRow'
import BudgetBar from '../components/ui/BudgetBar'
import GoalCard from '../components/ui/GoalCard'

export default function Dashboard() {
  const { netWorthHistory, accounts, monthlyOverview, budgets, transactions, goals } = useFinanceStore()
  
  const currentNetWorth = netWorthHistory[netWorthHistory.length - 1].netWorth
  const startOfYearNetWorth = netWorthHistory[netWorthHistory.length - 5]?.netWorth || netWorthHistory[0].netWorth
  const ytdChange = currentNetWorth - startOfYearNetWorth
  const ytdChangePct = ytdChange / startOfYearNetWorth
  
  const animatedNetWorth = useCountUp(currentNetWorth, 2500)
  
  const totalAssets = netWorthHistory[netWorthHistory.length - 1].assets
  const totalLiabilities = netWorthHistory[netWorthHistory.length - 1].liabilities

  return (
    <div className="space-y-8 pb-12">
      {/* A. Net Worth Hero */}
      <section className="flex flex-col gap-6 lg:flex-row lg:items-end justify-between">
        <div className="space-y-2">
          <p className="text-[13px] font-semibold text-[var(--color-text-muted)] tracking-tight uppercase">TOTAL NET WORTH</p>
          <h1 className="font-heading font-extrabold text-[44px] leading-none tracking-[-0.05em]">
            {formatCurrency(animatedNetWorth)}
          </h1>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-[var(--color-green)] bg-[var(--color-green-bg)] px-2 py-1 rounded text-sm font-medium">
              <TrendingUp className="w-4 h-4" />
              {ytdChange >= 0 ? '+' : ''}{formatCurrency(ytdChange)} ({ytdChange > 0 ? '+' : ''}{formatPercent(ytdChangePct * 100)})
            </div>
            <span className="text-sm text-[var(--color-text-dim)]">this year</span>
          </div>
          <div className="flex gap-4 pt-2 text-sm text-[var(--color-text-muted)]">
            <span>Assets: {formatCurrency(totalAssets, true)}</span>
            <span className="text-[var(--color-border-strong)]">|</span>
            <span>Liabilities: {formatCurrency(totalLiabilities, true)}</span>
          </div>
        </div>
        
        <div className="w-full lg:w-[60%] h-[200px] lg:h-[240px] bg-[var(--color-bg-card)] rounded-xl border border-[var(--color-border)] p-4 shadow-[var(--shadow-sm)] flex flex-col">
          <div className="flex justify-between items-center mb-4 shrink-0">
            <h3 className="text-[13px] font-semibold text-[var(--color-text-primary)]">Performance</h3>
            <div className="flex bg-[var(--color-bg-base)] rounded p-1">
              {['3M', '6M', '1Y', 'All'].map(t => (
                <button key={t} className={`px-2 py-1 text-[11px] font-medium rounded ${t === 'All' ? 'bg-[var(--color-bg-surface)] shadow-[var(--shadow-sm)]' : 'text-[var(--color-text-muted)]'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 min-h-0">
            <NetWorthChart />
          </div>
        </div>
      </section>

      {/* B. Account snapshot */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[13px] font-semibold text-[var(--color-text-primary)] tracking-[-0.01em]">ACCOUNTS</h2>
          <Link to="/accounts" className="text-sm font-medium text-[var(--color-blue)] hover:underline flex items-center gap-1">
            View All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="flex overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 gap-4 snap-x hide-scrollbar">
          {accounts.map((acc, i) => (
            <motion.div
              key={acc.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              className="snap-start"
            >
              <AccountCard account={acc} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* C. This Month summary row */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Income', value: monthlyOverview.incomeThisMonth, change: '+5.2%', positive: true },
          { label: 'Expenses', value: monthlyOverview.expensesThisMonth, change: '-2.1%', positive: true }, // lower expenses is good
          { label: 'Savings', value: monthlyOverview.savingsThisMonth, change: '+12.4%', positive: true },
          { label: 'Savings Rate', value: monthlyOverview.savingsRate, isPercent: true, change: '+2.1%', positive: true }
        ].map((stat, i) => (
          <div key={stat.label} className="bg-[var(--color-bg-card)] p-4 rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-sm)]">
            <p className="text-[12px] font-medium text-[var(--color-text-muted)] mb-1">{stat.label}</p>
            <p className="text-xl font-bold tabular-nums">
              {stat.isPercent ? `${stat.value}%` : formatCurrency(stat.value)}
            </p>
            <div className="mt-2 text-[11px] font-medium flex items-center gap-1 text-[var(--color-green)]">
              <TrendingUp className="w-3 h-3" /> {stat.change}
            </div>
          </div>
        ))}
      </section>

      {/* D. Two-column section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[var(--color-bg-card)] rounded-xl border border-[var(--color-border)] p-6 shadow-[var(--shadow-sm)]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[13px] font-semibold text-[var(--color-text-primary)] tracking-[-0.01em]">SPENDING</h2>
            <Link to="/budget" className="text-xs font-medium text-[var(--color-blue)]">Details</Link>
          </div>
          <SpendingChart />
        </div>
        
        <div className="bg-[var(--color-bg-card)] rounded-xl border border-[var(--color-border)] p-6 shadow-[var(--shadow-sm)] flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[13px] font-semibold text-[var(--color-text-primary)] tracking-[-0.01em]">BUDGET STATUS</h2>
            <Link to="/budget" className="text-xs font-medium text-[var(--color-blue)]">Manage</Link>
          </div>
          <div className="space-y-5 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {budgets.slice(0, 5).map((b, i) => {
              const isOver = b.spent > b.budgeted;
              return (
                <div key={b.category}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: b.color }}></span>
                      {b.category}
                    </span>
                    <span className="tabular-nums font-medium">
                      {formatCurrency(b.spent)} <span className="text-[var(--color-text-muted)] font-normal">/ {formatCurrency(b.budgeted)}</span>
                    </span>
                  </div>
                  <BudgetBar spent={b.spent} budgeted={b.budgeted} color={b.color} />
                  {isOver && (
                    <p className="text-[10px] text-[var(--color-red)] mt-1 font-medium text-right uppercase tracking-wider">
                      Over Budget by {formatCurrency(b.spent - b.budgeted)}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* E & F. Recent Transactions & Goals */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[var(--color-bg-card)] rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-sm)] overflow-hidden">
          <div className="p-4 md:p-6 border-b border-[var(--color-border)] flex justify-between items-center">
            <h2 className="text-[13px] font-semibold text-[var(--color-text-primary)] tracking-[-0.01em]">RECENT TRANSACTIONS</h2>
            <Link to="/transactions" className="text-sm font-medium text-[var(--color-blue)] hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div>
            {transactions.slice(0, 5).map((tx) => (
              <TransactionRow key={tx.id} transaction={tx} />
            ))}
          </div>
        </div>
        
        <div className="bg-[var(--color-bg-card)] rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-sm)] p-4 md:p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[13px] font-semibold text-[var(--color-text-primary)] tracking-[-0.01em]">GOALS</h2>
          </div>
          <div className="space-y-4 flex-1">
            {goals.slice(0, 2).map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
