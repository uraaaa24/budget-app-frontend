'use client'

import { usePeriod } from '@/contexts/period-context'
import { useGetDashboardSummary } from '../../../dashboard/hooks/use-dashboard-summary'
import PeriodSummaryItem, { PeriodTypes } from './item'
import Operator, { OperatorTypes } from './operator'
import PeriodSummarySkeleton from './skeleton'

const PeriodSummary = () => {
  const { from, to } = usePeriod()
  const { data, isLoading } = useGetDashboardSummary({ from, to })

  const totals = data?.total
  const income = totals?.income ?? 0
  const expense = totals?.expense ?? 0
  const net = totals?.net ?? 0

  if (isLoading) return <PeriodSummarySkeleton />

  return (
    <>
      {/* Mobile */}
      <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:hidden">
        <PeriodSummaryItem amount={income} type={PeriodTypes.INCOME} />
        <PeriodSummaryItem amount={expense} type={PeriodTypes.EXPENSE} />
      </div>

      {/* sm+ */}
      <div className="mx-auto hidden max-w-3xl grid-cols-[1fr_auto_1fr_auto_1fr] items-stretch gap-4 sm:grid">
        <PeriodSummaryItem amount={income} type={PeriodTypes.INCOME} />
        <Operator type={OperatorTypes.MINUS} />
        <PeriodSummaryItem amount={expense} type={PeriodTypes.EXPENSE} />
        <Operator type={OperatorTypes.EQUAL} />
        <PeriodSummaryItem amount={net} type={PeriodTypes.NET} />
      </div>
    </>
  )
}

export default PeriodSummary
