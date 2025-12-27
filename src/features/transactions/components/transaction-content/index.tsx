'use client'

import { usePeriod } from '@/contexts/period-context'
import { useGetTransactions } from '../../hooks/use-transaction'
import TransactionList from './transaction-list'
import TransactionTable from './transaction-table'

const TransactionContent = () => {
  const { from, to } = usePeriod()

  const { data, isLoading, isValidating, error } = useGetTransactions(from, to)

  return (
    <div className="container mx-auto py-6">
      {/* Mobile: list */}
      <div className="sm:hidden">
        <TransactionList
          transactions={data?.transactions ?? []}
          isLoading={isLoading}
          isValidating={isValidating}
          error={error}
        />
      </div>

      {/* sm+: table */}
      <div className="hidden sm:block">
        <TransactionTable
          transactions={data?.transactions ?? []}
          isLoading={isLoading}
          isValidating={isValidating}
          error={error}
        />
      </div>
    </div>
  )
}

export default TransactionContent
