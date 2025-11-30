'use client'

import { useState } from 'react'
import { getThisMonthPeriod } from '@/lib/date'
import { useGetDashboardSummary } from '../../hooks/use-dashboard-summary'
import PeriodCard from './period-card'

const DashboardSummaryPanelSkeleton = ({ count = 2 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-6 gap-4">
      {Array.from({ length: count }).map(() => (
        <div
          key={Math.random().toString(36)}
          className="flex h-28 flex-col justify-between rounded-xl border bg-white px-6 py-4 animate-pulse"
        >
          <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
          <div className="h-8 w-3/5 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  )
}

const DashboardSummaryPanel = () => {
  const initialRange = getThisMonthPeriod()

  const [from, setFrom] = useState(initialRange.from)
  const [to, setTo] = useState(initialRange.to)

  const { data, isLoading, error } = useGetDashboardSummary({ from, to })

  if (isLoading) return <DashboardSummaryPanelSkeleton />

  return (
    <div className="grid grid-cols-4 gap-4">
      <PeriodCard amount={data?.total.income || 0} type="income" />
      <PeriodCard amount={data?.total.expense || 0} type="expense" />
      {/* <PeriodCard amount={data?.total.net || 0} type="net" /> */}
    </div>
  )
}

export default DashboardSummaryPanel
