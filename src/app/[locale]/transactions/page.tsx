import TransactionForm from '@/features/transactions/components/transaction-form'
import TransactionTable from '@/features/transactions/components/transaction-table'

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
