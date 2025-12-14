import type { Metadata } from 'next'
import PeriodSummary from '@/features/transactions/components/period-summary'
import TransactionForm from '@/features/transactions/components/transaction-form'
import TransactionTable from '@/features/transactions/components/transaction-table'

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
      <TransactionTable />
    </>
  )
}

export default TransactionsPage
