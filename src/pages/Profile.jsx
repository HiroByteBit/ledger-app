import { useFinanceStore } from '../store/useFinanceStore'
import { formatCurrency } from '../utils/formatters'
import { Briefcase, Calendar, ShieldCheck, Mail, Building } from 'lucide-react'
import AccountCard from '../components/ui/AccountCard'
import TransactionRow from '../components/ui/TransactionRow'

export default function Profile() {
  const { profile, accounts, transactions } = useFinanceStore()
  const recentTransactions = transactions.slice(0, 5)

  return (
    <div className="space-y-8 pb-12 max-w-4xl">
      <div>
        <h1 className="font-heading font-extrabold text-3xl tracking-tighter mb-2">Profile & Employment</h1>
        <p className="text-sm text-[var(--color-text-muted)]">Verified institutional identity and payroll data.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-[var(--color-bg-card)] rounded-xl border border-[var(--color-border)] p-6 shadow-[var(--shadow-sm)] flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-[var(--color-accent)] text-white flex items-center justify-center text-3xl font-bold mb-4">
              {profile.name.split(' ').map(n => n[0]).join('')}
            </div>
            <h2 className="font-bold text-xl">{profile.name}</h2>
            <p className="text-sm text-[var(--color-text-muted)] mb-4">{profile.occupation}</p>
            <div className="flex items-center gap-2 px-3 py-1 bg-[var(--color-green-bg)] text-[var(--color-green)] rounded-full text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3 h-3" /> {profile.status}
            </div>
          </div>

          <div className="bg-[var(--color-bg-card)] rounded-xl border border-[var(--color-border)] p-4 shadow-[var(--shadow-sm)]">
            <h3 className="text-[11px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-4 px-2">Account Plan</h3>
            <div className="p-3 bg-[var(--color-bg-base)] rounded-lg border border-[var(--color-border)]">
              <p className="text-sm font-bold">{profile.plan}</p>
              <p className="text-[11px] text-[var(--color-text-muted)] mt-1">Next billing: June 12, 2026</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="bg-[var(--color-bg-card)] rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-sm)] overflow-hidden">
            <div className="p-4 border-b border-[var(--color-border)] bg-[var(--color-bg-hover)]">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--color-text-muted)]">Payroll & Employment</h3>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[var(--color-text-dim)] mb-1">
                  <Building className="w-4 h-4" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">Employer</span>
                </div>
                <p className="text-sm font-medium">{profile.company}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[var(--color-text-dim)] mb-1">
                  <Briefcase className="w-4 h-4" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">Position</span>
                </div>
                <p className="text-sm font-medium">{profile.occupation}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[var(--color-text-dim)] mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">Next Payday</span>
                </div>
                <p className="text-sm font-medium">{profile.nextPayday}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[var(--color-text-dim)] mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider">Annual Salary</span>
                </div>
                <p className="text-xl font-bold text-[var(--color-green)]">{formatCurrency(profile.salary)}</p>
              </div>
            </div>
          </div>

          <div className="bg-[var(--color-bg-card)] rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-sm)] overflow-hidden">
            <div className="p-4 border-b border-[var(--color-border)] bg-[var(--color-bg-hover)]">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--color-text-muted)]">Contact Information</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[var(--color-text-dim)]" />
                  <span className="text-sm">Email Address</span>
                </div>
                <span className="text-sm font-medium">{profile.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h2 className="font-heading font-extrabold text-2xl tracking-tighter">Linked Accounts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {accounts.map(account => (
            <AccountCard key={account.id} account={account} />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="font-heading font-extrabold text-2xl tracking-tighter">Recent Transactions</h2>
        <div className="bg-[var(--color-bg-card)] rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-sm)] overflow-hidden">
          {recentTransactions.map(tx => (
            <TransactionRow key={tx.id} transaction={tx} />
          ))}
        </div>
      </div>
    </div>
  )
}
