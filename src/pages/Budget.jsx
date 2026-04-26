import { useState } from 'react'
import { useFinanceStore } from '../store/useFinanceStore'
import { formatCurrency } from '../utils/formatters'
import CashFlowChart from '../components/charts/CashFlowChart'
import BudgetBar from '../components/ui/BudgetBar'
import { ChevronLeft, ChevronRight, Settings2 } from 'lucide-react'
import { format } from 'date-fns'
import { motion } from 'framer-motion'

export default function Budget() {
  const { budgets, budgetMonth } = useFinanceStore()
  const [showModal, setShowModal] = useState(false)
  
  const totalBudgeted = budgets.reduce((acc, b) => acc + b.budgeted, 0)
  const totalSpent = budgets.reduce((acc, b) => acc + b.spent, 0)

  return (
    <div className="space-y-8 pb-12">
      {/* A. Month selector & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <h1 className="font-heading font-extrabold text-3xl tracking-tighter">Budget</h1>
          <div className="flex items-center gap-2 bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-lg px-2 py-1">
            <button className="p-1 hover:bg-[var(--color-bg-hover)] rounded"><ChevronLeft className="w-4 h-4 text-[var(--color-text-muted)]" /></button>
            <span className="text-sm font-medium w-24 text-center">{format(budgetMonth, 'MMMM yyyy')}</span>
            <button className="p-1 hover:bg-[var(--color-bg-hover)] rounded text-[var(--color-text-muted)]"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-2 hover:bg-[var(--color-bg-hover)] transition-colors self-start"
        >
          <Settings2 className="w-4 h-4" /> Set Budgets
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* B. Budget overview card */}
          <div className="bg-[var(--color-bg-card)] rounded-xl border border-[var(--color-border)] p-6 shadow-[var(--shadow-sm)]">
            <div className="flex justify-between items-end mb-6">
              <div>
                <p className="text-[13px] font-semibold text-[var(--color-text-primary)] tracking-[-0.01em] mb-1">CASH FLOW</p>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold tabular-nums">{formatCurrency(totalSpent)} <span className="text-sm text-[var(--color-text-muted)] font-normal">spent</span></span>
                  <span className="text-[var(--color-border-strong)]">|</span>
                  <span className="text-2xl font-bold tabular-nums text-[var(--color-text-muted)]">{formatCurrency(totalBudgeted)} <span className="text-sm font-normal">budgeted</span></span>
                </div>
              </div>
            </div>
            <CashFlowChart />
          </div>

          {/* C. Budget category cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {budgets.map((b, i) => {
              const remaining = b.budgeted - b.spent
              const isOver = remaining < 0
              
              return (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={b.category} 
                  className="bg-[var(--color-bg-card)] rounded-xl border border-[var(--color-border)] p-5 shadow-[var(--shadow-sm)] group relative overflow-hidden"
                >
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${b.color}20`, color: b.color }}>
                        <span className="text-xs font-bold">{b.category.substring(0, 1)}</span>
                      </div>
                      <h3 className="font-semibold text-sm">{b.category}</h3>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 text-[11px] font-medium text-[var(--color-blue)] transition-opacity">
                      Edit
                    </button>
                  </div>
                  
                  <div className="mb-2 flex justify-between items-end">
                    <span className="font-bold tabular-nums">{formatCurrency(b.spent)}</span>
                    <span className="text-xs text-[var(--color-text-muted)] tabular-nums">of {formatCurrency(b.budgeted)}</span>
                  </div>
                  
                  <BudgetBar spent={b.spent} budgeted={b.budgeted} color={b.color} className="mb-3" />
                  
                  {isOver ? (
                    <p className="text-[11px] font-bold text-[var(--color-red)] uppercase tracking-wider">
                      Over by {formatCurrency(Math.abs(remaining))}
                    </p>
                  ) : (
                    <p className="text-[11px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
                      {formatCurrency(remaining)} left
                    </p>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* E. Insights panel */}
        <div className="space-y-6">
          <div className="bg-[var(--color-bg-card)] rounded-xl border border-[var(--color-border)] p-6 shadow-[var(--shadow-sm)]">
            <h2 className="text-[13px] font-semibold text-[var(--color-text-primary)] tracking-[-0.01em] mb-4">INSIGHTS</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-[var(--color-amber)] shrink-0"></div>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                  You spent <strong className="text-[var(--color-text-primary)]">$212 more</strong> on Shopping than last month.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-[var(--color-green)] shrink-0"></div>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                  You're on track to save <strong className="text-[var(--color-text-primary)]">$1,000</strong> this month. Great job!
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-[var(--color-blue)] shrink-0"></div>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                  Transport is 14% over budget — consider reviewing your recent gas purchases.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Set Budgets Modal Mock */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <motion.div 
            initial={{ scale: 0.97, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[var(--color-bg-surface)] w-full max-w-md rounded-2xl p-6 shadow-2xl max-h-[80vh] flex flex-col"
          >
            <h3 className="font-heading font-bold text-xl mb-2">Adjust Budgets</h3>
            <p className="text-sm text-[var(--color-text-muted)] mb-6">Set your target spending for each category.</p>
            
            <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar mb-6">
              {budgets.map(b => (
                <div key={b.category} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{b.category}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--color-text-muted)]">$</span>
                    <input 
                      type="number" 
                      defaultValue={b.budgeted}
                      className="w-20 bg-[var(--color-bg-base)] border border-[var(--color-border)] rounded px-2 py-1 text-right tabular-nums text-sm focus:outline-none focus:border-[var(--color-accent)]"
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-end gap-3 mt-auto pt-4 border-t border-[var(--color-border)]">
              <button 
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
              >
                Cancel
              </button>
              <button 
                onClick={() => setShowModal(false)}
                className="bg-[var(--color-accent)] text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                Save Changes
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
