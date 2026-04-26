import { create } from 'zustand'
import { accounts, transactions, budgets, goals, investments, netWorthHistory, monthlyOverview } from '../data/mockData'

export const useFinanceStore = create((set) => ({
  accounts,
  transactions,
  budgets,
  goals,
  investments,
  netWorthHistory,
  monthlyOverview,
  theme: localStorage.getItem('ledger-theme') || 'light',
  transactionFilters: {
    dateRange: 'This Month',
    categories: [],
    account: 'All',
    type: 'All',
    search: '',
  },
  selectedTimeframe: '1Y',
  expandedTx: null,
  selectedHolding: null,
  budgetMonth: new Date(),
  profile: {
    name: 'Hiro B.',
    email: 'hiro.b@finance.io',
    occupation: 'Senior Software Engineer',
    company: 'Nexus Systems',
    salary: 125000,
    nextPayday: '2026-05-01',
    status: 'Verified',
    plan: 'Pro Institutional'
  },

  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light'
    localStorage.setItem('ledger-theme', newTheme)
    return { theme: newTheme }
  }),
  
  setTransactionFilters: (filters) => set((state) => ({
    transactionFilters: { ...state.transactionFilters, ...filters }
  })),
  
  updateTxCategory: (id, category) => set((state) => ({
    transactions: state.transactions.map(tx => tx.id === id ? { ...tx, category } : tx)
  })),
  
  setTimeframe: (timeframe) => set({ selectedTimeframe: timeframe }),
  openHolding: (holding) => set({ selectedHolding: holding }),
  closeHolding: () => set({ selectedHolding: null }),
  setBudget: (category, amount) => set((state) => ({
    budgets: state.budgets.map(b => b.category === category ? { ...b, budgeted: amount } : b)
  })),
  setBudgetMonth: (date) => set({ budgetMonth: date }),
}))
