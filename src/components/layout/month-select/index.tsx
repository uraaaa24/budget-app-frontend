'use client'

import { useLocale } from 'next-intl'
import MonthSelect from '@/components/parts/forms/month-select'
import { usePeriod } from '@/contexts/period-context'
import { formatDateToYmd } from '@/lib/date'

const TransactionPeriodSelect = () => {
  const locale = useLocale()
  const { from, setPeriod } = usePeriod()

  const monthValue = from.slice(0, 7) // "YYYY-MM"

  return (
    <MonthSelect
      value={monthValue}
      locale={locale}
      onChange={(ym) => {
        const [year, month] = ym.split('-').map(Number)
        const newFrom = new Date(year, month - 1, 1)
        const newTo = new Date(year, month, 0)
        setPeriod(formatDateToYmd(newFrom), formatDateToYmd(newTo))
      }}
    />
  )
}

export default TransactionPeriodSelect
