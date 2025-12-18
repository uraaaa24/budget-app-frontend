import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

export const PeriodTypes = {
  INCOME: 'income',
  EXPENSE: 'expense',
  NET: 'net',
} as const
type PeriodType = (typeof PeriodTypes)[keyof typeof PeriodTypes]

type PeriodCardProps = {
  amount: number
  type: PeriodType
  className?: string
}

const getAmountColorClass = (type: PeriodType) => {
  switch (type) {
    case PeriodTypes.INCOME:
      return 'text-green-500'
    case PeriodTypes.EXPENSE:
      return 'text-red-500'
    default:
      return 'text-gray-500'
  }
}

const formatAmount = (amount: number) => {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
    maximumFractionDigits: 0,
  }).format(amount)
}

const PeriodSummaryItem = ({ amount, type }: PeriodCardProps) => {
  const t = useTranslations('HomePage.DashboardSummary')

  const isZero = amount === 0

  return (
    <div className="flex h-32 flex-col items-center justify-between py-6">
      <div className="text-sm font-semibold">{t(type)}</div>

      <div
        className={cn(
          'text-3xl font-semibold tracking-tight',
          getAmountColorClass(type),
          isZero && 'text-gray-500',
        )}
      >
        {formatAmount(amount)}
      </div>
    </div>
  )
}

export default PeriodSummaryItem
