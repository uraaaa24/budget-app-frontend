import Operator, { OperatorTypes } from './operator'

const PeriodSummaryItemSkeleton = () => {
  return (
    <div className="flex h-32 flex-col items-center justify-between py-6">
      <div className="h-4 w-3/5 rounded bg-gray-200" />
      <div className="h-8 w-3/5 rounded bg-gray-200" />
    </div>
  )
}

const PeriodSummarySkeleton = () => {
  return (
    <div className="mx-auto grid max-w-3xl grid-cols-[1fr_auto_1fr_auto_1fr] items-stretch gap-4">
      <PeriodSummaryItemSkeleton />
      <Operator type={OperatorTypes.MINUS} />
      <PeriodSummaryItemSkeleton />
      <Operator type={OperatorTypes.EQUAL} />
      <PeriodSummaryItemSkeleton />
    </div>
  )
}

export default PeriodSummarySkeleton
