'use client'

import type { ColumnDef } from '@tanstack/react-table'
import DataTable from '@/components/parts/tables/data-table'
import { useGetTransactions } from '../../hooks/use-transaction'
import type { Transaction } from '../../types/transaction'
import TransactionActionCell from './action-cell'
import TransactionTableAmountCell from './amount-cell'

export type TransactionTableRow = Transaction

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
    cell: ({ row: { original: transaction } }) => {
      return (
        <TransactionTableAmountCell
          transactionType={transaction.type}
          amount={transaction.amount}
        />
      )
    },
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
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row: { original: transaction } }) => {
      return <TransactionActionCell transaction={transaction} />
    },
  },
]

const TransactionTable = () => {
  const { data, isLoading, isValidating, error } = useGetTransactions()

  const tableData: TransactionTableRow[] =
    data?.transactions.map((tx) => ({
      id: tx.id.toString(),
      type: tx.type,
      amount: tx.amount,
      occurredAt: new Date(tx.occurred_at).toISOString().split('T')[0],
      description: tx.description,
    })) ?? []

  return (
    <div className="container mx-auto py-6">
      <DataTable
        columns={columns}
        data={tableData}
        isLoading={isLoading || isValidating}
        error={error}
      />
    </div>
  )
}

export default TransactionTable
