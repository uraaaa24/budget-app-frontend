import type { Metadata } from 'next'
import PeriodSummary from '@/features/transactions/components/period-summary'
import TransactionContent from '@/features/transactions/components/transaction-content'
import TransactionForm from '@/features/transactions/components/transaction-form'

export const metadata: Metadata = {
  title: 'Transactions - Budget App',
  description: 'Manage your transactions effectively with Budget App',
}

const TransactionsPage = () => {
  return (
    <>
      <PeriodSummary />

      <div className="flex items-center justify-end">
        <TransactionForm />
      </div>
      <TransactionContent />
    </>
  )
}

export default TransactionsPage
