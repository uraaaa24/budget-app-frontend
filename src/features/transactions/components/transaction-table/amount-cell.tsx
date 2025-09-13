import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { TransactionType } from '../../types/transaction'

type TransactionTableAmountCellProps = {
  transactionType: TransactionType
  amount: number
}

const TransactionTableAmountCell = ({
  transactionType,
  amount,
}: TransactionTableAmountCellProps) => {
  const isIncome = transactionType === 'income'
  const sign = isIncome ? '+' : '−'

  const formatted = new Intl.NumberFormat('en-US', {
    currency: 'JPY',
  }).format(Math.abs(amount))

  return (
    <Badge
      variant="outline"
      className={cn(
        'tabular-nums font-medium',
        isIncome
          ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/40 dark:text-emerald-300'
          : 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900/40 dark:bg-rose-950/40 dark:text-rose-300',
      )}
    >
      {sign}
      {formatted}
    </Badge>
  )
}

export default TransactionTableAmountCell
