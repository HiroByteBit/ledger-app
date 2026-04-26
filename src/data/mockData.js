import { subDays, subMonths, startOfMonth, format } from 'date-fns'

export const accounts = [
  { id: '1', name: 'Checking', institution: 'Chase', balance: 12847.33, type: 'asset', category: 'Cash' },
  { id: '2', name: 'Savings', institution: 'Ally', balance: 48200.00, type: 'asset', category: 'Cash' },
  { id: '3', name: 'Credit Card', institution: 'Amex', balance: -3241.18, type: 'liability', category: 'Credit', limit: 15000 },
  { id: '4', name: 'Brokerage', institution: 'Fidelity', balance: 142880.00, type: 'asset', category: 'Investment', dayChange: 1240 },
  { id: '5', name: '401(k)', institution: 'Vanguard', balance: 89340.00, type: 'asset', category: 'Investment', dayChange: 450 },
  { id: '6', name: 'Roth IRA', institution: 'Schwab', balance: 34620.00, type: 'asset', category: 'Investment', dayChange: 152 },
  { id: '7', name: 'Auto Loan', institution: 'Chase', balance: -18400.00, type: 'liability', category: 'Loan' },
  { id: '8', name: 'Crypto', institution: 'Coinbase', balance: 8340.00, type: 'asset', category: 'Crypto', dayChange: -340 },
]

export const netWorthHistory = Array.from({ length: 24 }).map((_, i) => {
  const monthsAgo = 23 - i;
  const date = subMonths(new Date(), monthsAgo)
  const baseAssets = 180000 + (monthsAgo === 0 ? 0 : 0); // Need to calculate a realistic curve
  // Let's create a curve from 180k to 314k
  const progress = i / 23;
  const assets = 190000 + (progress * 146000) + (Math.random() * 5000 - 2500);
  const liabilities = 30000 - (progress * 8000) + (Math.random() * 1000 - 500);
  
  return {
    date: format(date, 'MMM yyyy'),
    fullDate: date,
    assets: Math.round(assets),
    liabilities: Math.round(-liabilities),
    netWorth: Math.round(assets - liabilities)
  }
})

// Ensure the last point matches exact current numbers
netWorthHistory[23].assets = 336227
netWorthHistory[23].liabilities = -21641
netWorthHistory[23].netWorth = 314587

const merchants = [
  { name: 'Whole Foods', category: 'Food & Dining', amount: [40, 150] },
  { name: 'Netflix', category: 'Entertainment', amount: [15.99, 15.99] },
  { name: 'Shell', category: 'Transport', amount: [40, 75] },
  { name: 'Amazon', category: 'Shopping', amount: [20, 150] },
  { name: 'Starbucks', category: 'Food & Dining', amount: [5, 15] },
  { name: 'Mortgage', category: 'Housing', amount: [2400, 2400] },
  { name: 'Gym', category: 'Healthcare', amount: [49, 49] },
  { name: 'Electric Bill', category: 'Utilities', amount: [120, 180] },
]

export const transactions = Array.from({ length: 80 }).map((_, i) => {
  const isIncome = i % 15 === 0;
  const merchant = isIncome ? { name: 'Payroll', category: 'Income', amount: [2600, 2600] } : merchants[Math.floor(Math.random() * merchants.length)];
  const amount = merchant.amount[0] + Math.random() * (merchant.amount[1] - merchant.amount[0]);
  
  return {
    id: `tx-${i}`,
    date: subDays(new Date(), Math.floor(i * 0.75)).toISOString(),
    merchant: merchant.name,
    category: merchant.category,
    amount: isIncome ? amount : -amount,
    type: isIncome ? 'credit' : 'debit',
    account: isIncome ? 'Checking' : (Math.random() > 0.5 ? 'Credit Card' : 'Checking'),
    status: i < 3 ? 'pending' : 'cleared',
    notes: null
  }
})

export const budgets = [
  { category: 'Housing', budgeted: 2400, spent: 2400, color: '#6366f1' },
  { category: 'Food & Dining', budgeted: 600, spent: 487, color: '#f97316' },
  { category: 'Transport', budgeted: 300, spent: 341, color: '#0ea5e9' },
  { category: 'Shopping', budgeted: 400, spent: 612, color: '#ec4899' },
  { category: 'Entertainment', budgeted: 200, spent: 89, color: '#8b5cf6' },
  { category: 'Healthcare', budgeted: 150, spent: 0, color: '#10b981' },
  { category: 'Utilities', budgeted: 180, spent: 163, color: '#64748b' },
  { category: 'Savings', budgeted: 1000, spent: 1000, color: '#1d4ed8' },
]

export const goals = [
  { id: '1', title: 'Emergency Fund', targetAmount: 30000, currentAmount: 12847, deadline: '2027-12-31', category: 'Savings' },
  { id: '2', title: 'Hawaii Vacation', targetAmount: 8000, currentAmount: 3200, deadline: '2026-08-01', category: 'Travel' },
  { id: '3', title: 'Home Down Payment', targetAmount: 100000, currentAmount: 28400, deadline: '2029-01-01', category: 'Housing' },
  { id: '4', title: 'New Car', targetAmount: 45000, currentAmount: 18200, deadline: '2027-06-01', category: 'Vehicle' },
]

export const investments = [
  { symbol: 'VOO', name: 'Vanguard S&P 500 ETF', shares: 145.2, avgCost: 380.50, currentPrice: 472.10, marketValue: 68548.92, dayChange: 420.50, dayChangePct: 0.62, totalGain: 13300.32, allocation: 25.6, assetClass: 'US Stocks' },
  { symbol: 'QQQ', name: 'Invesco QQQ Trust', shares: 85.5, avgCost: 320.10, currentPrice: 435.60, marketValue: 37243.80, dayChange: 310.20, dayChangePct: 0.84, totalGain: 9875.25, allocation: 13.9, assetClass: 'US Stocks' },
  { symbol: 'AAPL', name: 'Apple Inc.', shares: 120, avgCost: 145.20, currentPrice: 185.40, marketValue: 22248.00, dayChange: 156.00, dayChangePct: 0.71, totalGain: 4824.00, allocation: 8.3, assetClass: 'US Stocks' },
  { symbol: 'MSFT', name: 'Microsoft Corp.', shares: 65, avgCost: 280.40, currentPrice: 410.20, marketValue: 26663.00, dayChange: 215.80, dayChangePct: 0.82, totalGain: 8437.00, allocation: 10.0, assetClass: 'US Stocks' },
  { symbol: 'VTI', name: 'Vanguard Total Stock', shares: 95.4, avgCost: 205.10, currentPrice: 254.30, marketValue: 24260.22, dayChange: 145.20, dayChangePct: 0.60, totalGain: 4693.68, allocation: 9.1, assetClass: 'US Stocks' },
  { symbol: 'VXUS', name: 'Vanguard Total Intl', shares: 250, avgCost: 55.40, currentPrice: 62.10, marketValue: 15525.00, dayChange: -45.00, dayChangePct: -0.29, totalGain: 1675.00, allocation: 5.8, assetClass: 'International' },
  { symbol: 'BND', name: 'Vanguard Total Bond', shares: 320, avgCost: 75.80, currentPrice: 72.40, marketValue: 23168.00, dayChange: 32.00, dayChangePct: 0.14, totalGain: -1088.00, allocation: 8.7, assetClass: 'Bonds' },
  { symbol: 'VNQ', name: 'Vanguard Real Estate', shares: 150, avgCost: 92.50, currentPrice: 85.60, marketValue: 12840.00, dayChange: 85.00, dayChangePct: 0.67, totalGain: -1035.00, allocation: 4.8, assetClass: 'Real Estate' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 80, avgCost: 110.20, currentPrice: 145.30, marketValue: 11624.00, dayChange: 112.00, dayChangePct: 0.97, totalGain: 2808.00, allocation: 4.3, assetClass: 'US Stocks' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', shares: 100, avgCost: 125.40, currentPrice: 175.20, marketValue: 17520.00, dayChange: 85.00, dayChangePct: 0.49, totalGain: 4980.00, allocation: 6.5, assetClass: 'US Stocks' },
  { symbol: 'TSLA', name: 'Tesla Inc.', shares: 30, avgCost: 210.50, currentPrice: 195.40, marketValue: 5862.00, dayChange: -125.00, dayChangePct: -2.09, totalGain: -453.00, allocation: 2.2, assetClass: 'US Stocks' },
  { symbol: 'VIG', name: 'Vanguard Dividend', shares: 12.5, avgCost: 155.20, currentPrice: 178.90, marketValue: 2236.25, dayChange: 8.50, dayChangePct: 0.38, totalGain: 296.25, allocation: 0.8, assetClass: 'US Stocks' }
]

export const monthlyOverview = {
  incomeThisMonth: 5200,
  expensesThisMonth: 4138,
  savingsThisMonth: 1062,
  savingsRate: 20.4,
}
