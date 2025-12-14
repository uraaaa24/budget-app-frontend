'use client'

import { useState } from 'react'
import { getThisMonthPeriod } from '@/lib/date'
import { useGetDashboardSummary } from '../../../dashboard/hooks/use-dashboard-summary'
import PeriodSummaryItem, { PeriodTypes } from './item'
import Operator, { OperatorTypes } from './operator'
import PeriodSummarySkeleton from './skeleton'

const PeriodSummary = () => {
  const initialRange = getThisMonthPeriod()

  const [from, setFrom] = useState(initialRange.from)
  const [to, setTo] = useState(initialRange.to)

  const { data, isLoading, error } = useGetDashboardSummary({ from, to })

  if (isLoading) return <PeriodSummarySkeleton />

  return (
    <div className="mx-auto grid max-w-3xl grid-cols-[1fr_auto_1fr_auto_1fr] items-stretch gap-4">
      <PeriodSummaryItem
        amount={data?.total.income || 0}
        type={PeriodTypes.INCOME}
      />
      <Operator type={OperatorTypes.MINUS} />
      <PeriodSummaryItem
        amount={data?.total.expense || 0}
        type={PeriodTypes.EXPENSE}
      />
      <Operator type={OperatorTypes.EQUAL} />
      <PeriodSummaryItem amount={data?.total.net || 0} type={PeriodTypes.NET} />
    </div>
  )
}

export default PeriodSummary
