import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { TransactionType } from '../../../types/transaction'

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

  const formatted = new Intl.NumberFormat('ja-JP', {
    currency: 'JPY',
  }).format(Math.abs(amount))

  return (
    <Badge
      variant="outline"
      className={cn(
        'tabular-nums font-semibold rounded-full px-2.5 py-1 text-xs',
        'border-transparent ring-1 ring-inset',
        isIncome
          ? 'bg-emerald-500/5 text-emerald-600 ring-emerald-500/20'
          : 'bg-rose-500/5 text-rose-600 ring-rose-500/20',
      )}
    >
      {sign}
      {formatted}
    </Badge>
  )
}

export default TransactionTableAmountCell
