import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

type PeriodType = 'income' | 'expense' | 'net'

type PeriodCardProps = {
  amount: number
  type: PeriodType
  className?: string
}

const getAmountColorClass = (type: PeriodType, amount: number) => {
  if (type === 'net') {
    if (amount > 0) return 'text-green-500'
    if (amount < 0) return 'text-red-500'
    return 'text-gray-500'
  }

  if (type === 'income') return 'text-green-500'
  if (type === 'expense') return 'text-red-500'
  return 'text-gray-500'
}

const formatAmount = (amount: number) => {
  // 必要に応じて locale / currency は外から渡してもOK
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
    maximumFractionDigits: 0,
  }).format(amount)
}

const PeriodCard = ({ amount, type }: PeriodCardProps) => {
  const t = useTranslations('HomePage.DashboardSummary')

  const isZero = amount === 0
  const displayAmount = isZero ? 0 : formatAmount(amount)

  return (
    <div className="flex h-32 flex-col justify-between rounded-xl border bg-white p-6">
      <div className="text-sm font-medium text-gray-500">{t(type)}</div>

      <div
        className={cn(
          'text-2xl font-semibold tracking-tight',
          getAmountColorClass(type, amount),
          isZero && 'text-gray-400',
        )}
      >
        {displayAmount}
      </div>
    </div>
  )
}

export default PeriodCard
