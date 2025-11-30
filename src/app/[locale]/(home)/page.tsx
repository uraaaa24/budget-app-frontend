import type { Metadata } from 'next'
import TransactionForm from '@/features/transactions/components/transaction-form'
import TransactionTable from '@/features/transactions/components/transaction-table'

export const metadata: Metadata = {
  title: 'Transactions - Budget App',
  description: 'Manage your transactions effectively with Budget App',
}

const TransactionsPage = async () => {
  return (
    <>
      <div className="flex items-center justify-end">
        <TransactionForm />
      </div>
      <TransactionTable />
    </>
  )
}

export default TransactionsPage
