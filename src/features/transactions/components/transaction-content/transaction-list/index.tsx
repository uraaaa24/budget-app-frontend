import { useLocale } from 'next-intl'
import { useMemo } from 'react'
import type { GetTransactionsResponse } from '@/features/transactions/types/api'
import type { Transaction } from '@/features/transactions/types/transaction'
import { formatAmount } from '@/lib/currency'
import { formatDateToYmd, formatRelativeDayLabel } from '@/lib/date'

type TransactionListItem = Transaction & {
  occurredAtMs: number
}

type GroupedItem = {
  dateKey: string
  headerLabel: string
  rows: TransactionListItem[]
}

type TransactionTableProps = {
  transactions: GetTransactionsResponse['transactions']
  isLoading: boolean
  isValidating: boolean
  error?: Error
}

const TransactionList = ({
  transactions,
  isLoading,
  isValidating,
  error,
}: TransactionTableProps) => {
  const locale = useLocale()

  const groupedList: GroupedItem[] = useMemo(() => {
    if (!transactions?.length) return []

    const groups = new Map<string, TransactionListItem[]>()

    for (const tx of transactions) {
      const occurredDate = new Date(tx.occurred_at)

      const item: TransactionListItem = {
        ...tx,
        id: tx.id.toString(),
        occurredAt: formatDateToYmd(occurredDate),
        occurredAtMs: occurredDate.getTime(),
      }

      const key = item.occurredAt
      const arr = groups.get(key)

      if (arr) {
        arr.push(item)
      } else {
        groups.set(key, [item])
      }
    }

    return Array.from(groups.entries())
      .sort((a, b) => (a[0] < b[0] ? 1 : -1))
      .map(([dateKey, rows]) => ({
        dateKey,
        headerLabel: formatRelativeDayLabel(dateKey, locale),
        rows,
      }))
  }, [transactions, locale])

  if (isLoading || isValidating) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className="space-y-6">
      {groupedList.map(({ dateKey, headerLabel, rows }) => (
        <div key={dateKey}>
          <h2 className="mb-4 text-lg font-bold">{headerLabel}</h2>
          <ul className="space-y-2">
            {rows.map((tx) => (
              <li
                key={tx.id}
                className="flex justify-between rounded-md bg-white p-4 border"
              >
                <div>
                  <div className="font-medium">
                    {tx.category ? tx.category.name : 'No Category'}
                  </div>
                  {tx.description && (
                    <div className="text-sm text-gray-400">
                      {tx.description}
                    </div>
                  )}
                </div>
                <div
                  className={`text-lg font-medium ${
                    tx.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {tx.type === 'income' ? '+' : '-'}
                  {formatAmount(tx.amount, locale)}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default TransactionList
