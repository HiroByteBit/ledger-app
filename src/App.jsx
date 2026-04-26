import { Routes, Route } from 'react-router'
import { useEffect } from 'react'
import { useFinanceStore } from './store/useFinanceStore'

import Shell from './components/layout/Shell'
import Dashboard from './pages/Dashboard'
import Accounts from './pages/Accounts'
import Transactions from './pages/Transactions'
import Budget from './pages/Budget'
import Investments from './pages/Investments'
import Profile from './pages/Profile'

function App() {
  const theme = useFinanceStore((state) => state.theme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <Routes>
      <Route path="/" element={<Shell />}>
        <Route index element={<Dashboard />} />
        <Route path="accounts" element={<Accounts />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="budget" element={<Budget />} />
        <Route path="investments" element={<Investments />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  )
}

export default App
