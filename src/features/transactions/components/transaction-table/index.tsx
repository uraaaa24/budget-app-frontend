'use client'

import type { ColumnDef } from '@tanstack/react-table'
import DataTable from '@/components/parts/tables/data-table'
import { useGetTransactions } from '../../hooks/use-transaction'
import type { Transaction } from '../../types/transaction'

type TransactionTableRow = Omit<Transaction, 'id'>

const columns: ColumnDef<TransactionTableRow>[] = [
  {
    accessorKey: 'occurredAt',
    header: 'Date',
    enableSorting: true,
  },
  // The type is displayed with a symbol in the Amount field, so this field is hidden.
  // TODO: Once implementation is complete, delete this comment.
  // {
  //   accessorKey: 'type',
  //   header: 'Type',
  // },
  {
    accessorKey: 'amount',
    header: 'Amount',
    enableSorting: true,
  },
  {
    accessorKey: 'category',
    header: 'Category',
    enableSorting: true,
  },
  {
    accessorKey: 'account',
    header: 'Account',
    enableSorting: true,
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
]

const TransactionTable = () => {
  const { data, isLoading, error } = useGetTransactions()

  const tableData: TransactionTableRow[] =
    data?.transactions.map((t) => {
      return {
        type: t.type,
        amount: t.amount,
        occurredAt: new Date(t.occurred_at).toISOString().split('T')[0],
        description: t.description || '',
      }
    }) ?? []

  return (
    <div className="container mx-auto py-6">
      <DataTable
        columns={columns}
        data={tableData}
        isLoading={isLoading}
        error={error}
      />
    </div>
  )
}

export default TransactionTable
