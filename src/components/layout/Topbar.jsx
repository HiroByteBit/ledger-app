import { Moon, Sun, Bell, Menu } from 'lucide-react'
import { useFinanceStore } from '../../store/useFinanceStore'
import { motion, AnimatePresence } from 'framer-motion'

export default function Topbar() {
  const { theme, toggleTheme } = useFinanceStore()

  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-8 border-b border-[var(--color-border)] bg-[var(--color-bg-surface)] shrink-0">
      <div className="flex items-center gap-4 md:hidden">
        <button className="p-2 -ml-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]">
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="font-heading font-extrabold text-xl tracking-tighter">
          ledger.
        </h1>
      </div>
      
      <div className="hidden md:block">
        {/* Placeholder for page specific context or breadcrumbs */}
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <button className="relative p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--color-red)] border-2 border-[var(--color-bg-surface)]"></span>
        </button>
        
        <button 
          onClick={toggleTheme}
          className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors relative overflow-hidden"
          aria-label="Toggle theme"
        >
          <AnimatePresence mode="wait" initial={false}>
            {theme === 'dark' ? (
              <motion.div
                key="sun"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Sun className="w-4 h-4" />
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Moon className="w-4 h-4" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </header>
  )
}
