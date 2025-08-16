import type { ColumnDef } from '@tanstack/react-table'
import DataTable from '@/components/common/tables/data-table'
import type { Transaction } from '../transaction-type'

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

const getData = (): TransactionTableRow[] => {
  return [
    {
      type: 'expense',
      amount: 1200,
      occurredAt: '2025-08-01',
      category: '食費',
      account: '現金',
      description: 'ランチ（牛丼）',
    },
    {
      type: 'income',
      amount: 300000,
      occurredAt: '2025-08-01',
      category: '給与',
      account: '三井住友 銀行',
      description: '8月分給与',
    },
    {
      type: 'expense',
      amount: 5800,
      occurredAt: '2025-08-02',
      category: '食費',
      account: '三井住友 銀行',
      description: 'スーパーでまとめ買い',
    },
    {
      type: 'expense',
      amount: 8000,
      occurredAt: '2025-08-03',
      category: '水道光熱',
      account: '楽天カード',
      description: '電気代（7月）',
    },
    {
      type: 'expense',
      amount: 110000,
      occurredAt: '2025-08-05',
      category: '住居',
      account: '三井住友 銀行',
      description: '家賃',
    },
    {
      type: 'expense',
      amount: 980,
      occurredAt: '2025-08-06',
      category: '交通',
      account: '現金',
      description: 'バス代',
    },
    {
      type: 'income',
      amount: 12000,
      occurredAt: '2025-08-08',
      category: 'その他収入',
      account: '三井住友 銀行',
      description: 'フリマ売上',
    },
    {
      type: 'expense',
      amount: 4200,
      occurredAt: '2025-08-09',
      category: '通信',
      account: '楽天カード',
      description: '携帯料金',
    },
    {
      type: 'expense',
      amount: 2400,
      occurredAt: '2025-08-10',
      category: '趣味',
      account: '楽天カード',
      description: '音楽サブスク',
    },
  ]
}

const TransactionTable = () => {
  const data = getData()
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}

export default TransactionTable
