const PeriodSummarySkeleton = ({ count = 3 }: { count?: number }) => {
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

export default PeriodSummarySkeleton
