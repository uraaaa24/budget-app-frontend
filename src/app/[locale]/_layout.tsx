'use client'

import { useLocale } from 'next-intl'
import Header from '@/components/layout/header'
import TransactionPeriodSelect from '@/components/layout/month-select'
import MonthSelect from '@/components/parts/forms/month-select'
import { usePeriod } from '@/contexts/period-context'
import { formatDateToYmd } from '@/lib/date'

const InternalLocaleLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto w-full min-h-screen flex flex-col">
      <div className="mt-2 mb-6 p-4">
        <Header />
        <TransactionPeriodSelect />
      </div>

      <div className="bg-gray-50 flex-1 py-8">
        <div className="max-w-5xl mx-auto">{children}</div>
      </div>
    </div>
  )
}

export default InternalLocaleLayout
