import TransactionForm from '@/features/transactions/components/transaction-form'
import TransactionTable from '@/features/transactions/components/transaction-table'
import type { Transaction } from '@/features/transactions/transaction-type'
import { authApiClient } from '@/lib/api-client'

const fetchTransactions = async (): Promise<Transaction[]> => {
  try {
    return await authApiClient<Transaction[]>(
      'http://localhost:8000/transactions',
    )
  } catch (error) {
    console.error('Error fetching transactions:', error)
    return []
  }
}

const TransactionsPage = async () => {
  const data = await fetchTransactions()

  console.log('Transactions:', data)

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
