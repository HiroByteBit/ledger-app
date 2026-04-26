import { NavLink } from 'react-router'
import { LayoutDashboard, WalletCards, ArrowRightLeft, PieChart, TrendingUp, User } from 'lucide-react'
import { cn } from '../../utils/cn'

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/accounts', label: 'Accounts', icon: WalletCards },
  { path: '/transactions', label: 'Transactions', icon: ArrowRightLeft },
  { path: '/budget', label: 'Budget', icon: PieChart },
  { path: '/investments', label: 'Investments', icon: TrendingUp },
  { path: '/profile', label: 'Profile', icon: User },
]

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-[var(--color-border)] bg-[var(--color-bg-surface)] hidden md:flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-[var(--color-border)]">
        <h1 className="font-heading font-extrabold text-2xl tracking-tighter text-[var(--color-text-primary)]">
          ledger.
        </h1>
      </div>
      
      <nav className="flex-1 py-6 px-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              isActive 
                ? "bg-[var(--color-bg-hover)] text-[var(--color-text-primary)]" 
                : "text-[var(--color-text-muted)] hover:bg-[var(--color-bg-hover)] hover:text-[var(--color-text-primary)]"
            )}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>
      
      <div className="p-6 border-t border-[var(--color-border)]">
        <NavLink to="/profile" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
          <div className="w-8 h-8 rounded-full bg-[var(--color-accent)] text-white flex items-center justify-center text-xs font-bold">
            HB
          </div>
          <div>
            <p className="text-sm font-medium group-hover:text-[var(--color-text-primary)]">Hiro B.</p>
            <p className="text-xs text-[var(--color-text-dim)]">Pro Institutional</p>
          </div>
        </NavLink>
      </div>
    </aside>
  )
}
