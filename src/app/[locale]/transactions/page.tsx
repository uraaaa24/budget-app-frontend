import TransactionTable from '@/features/transactions/components/transaction-table'

const TransactionsPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Transactions</h1>
      <p className="mt-2">This is the transactions page.</p>

      <TransactionTable />
    </div>
  )
}

export default TransactionsPage
