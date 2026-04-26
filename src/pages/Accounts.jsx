import { useState } from 'react'
import { useFinanceStore } from '../store/useFinanceStore'
import { formatCurrency } from '../utils/formatters'
import { Plus } from 'lucide-react'
import AccountCard from '../components/ui/AccountCard'

export default function Accounts() {
  const { accounts, netWorthHistory } = useFinanceStore()
  const [showModal, setShowModal] = useState(false)
  
  const currentNetWorthData = netWorthHistory[netWorthHistory.length - 1]
  
  const groupedAccounts = {
    'CASH & SAVINGS': accounts.filter(a => a.category === 'Cash'),
    'INVESTMENTS': accounts.filter(a => a.category === 'Investment'),
    'CREDIT & LOANS': accounts.filter(a => a.category === 'Credit' || a.category === 'Loan'),
    'CRYPTO': accounts.filter(a => a.category === 'Crypto'),
  }

  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-center">
        <h1 className="font-heading font-extrabold text-3xl tracking-tighter">Accounts</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-[var(--color-accent)] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" /> Add Account
        </button>
      </div>

      {/* A. Net worth summary bar */}
      <div className="bg-[var(--color-bg-card)] rounded-xl border border-[var(--color-border)] p-6 shadow-[var(--shadow-sm)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-[12px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Total Assets</p>
          <p className="text-2xl font-bold tabular-nums text-[var(--color-green)]">{formatCurrency(currentNetWorthData.assets)}</p>
        </div>
        <div className="hidden md:block h-10 w-px bg-[var(--color-border)]"></div>
        <div>
          <p className="text-[12px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Total Liabilities</p>
          <p className="text-2xl font-bold tabular-nums text-[var(--color-red)]">{formatCurrency(currentNetWorthData.liabilities)}</p>
        </div>
        <div className="hidden md:block h-10 w-px bg-[var(--color-border)]"></div>
        <div>
          <p className="text-[12px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Net Worth</p>
          <p className="text-2xl font-bold tabular-nums text-[var(--color-text-primary)]">{formatCurrency(currentNetWorthData.netWorth)}</p>
        </div>
      </div>

      {/* B. Account groups */}
      <div className="space-y-8">
        {Object.entries(groupedAccounts).map(([groupName, groupAccounts]) => {
          if (groupAccounts.length === 0) return null
          
          return (
            <section key={groupName}>
              <h2 className="text-[13px] font-semibold text-[var(--color-text-primary)] tracking-[-0.01em] mb-4">
                {groupName}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {groupAccounts.map(account => (
                  <AccountCard key={account.id} account={account} />
                ))}
              </div>
            </section>
          )
        })}
      </div>

      {/* Add Account Modal Mock */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-[var(--color-bg-surface)] w-full max-w-md rounded-2xl p-6 shadow-2xl">
            <h3 className="font-heading font-bold text-xl mb-2">Connect Institution</h3>
            <p className="text-sm text-[var(--color-text-muted)] mb-6">Select your bank to securely link your accounts.</p>
            
            <div className="space-y-3 mb-6">
              {['Chase', 'Bank of America', 'Wells Fargo', 'Capital One'].map(bank => (
                <button key={bank} className="w-full p-4 text-left border border-[var(--color-border)] rounded-xl hover:bg-[var(--color-bg-hover)] hover:border-[var(--color-accent)] transition-colors font-medium">
                  {bank}
                </button>
              ))}
            </div>
            
            <div className="flex justify-end gap-3">
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
                Mock Connect
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
