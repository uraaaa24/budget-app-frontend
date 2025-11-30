import useSWR from 'swr'
import { env } from '@/config/env'
import { useFetcher } from '@/hooks/use-swr'

type DasuboardPeriod = {
  from: string
  to: string
}

type DashbaordTotal = {
  income: number
  expense: number
  net: number
  average_daily_expense: number
}

type DashboardByCategory = {
  category_id: string
  category_name: string
  total_amount: number
  ratio: number
}

type DashboardSummary = {
  period: DasuboardPeriod
  total: DashbaordTotal
  by_category: DashboardByCategory[]
}

type UseGetDashboardSummaryArgs = {
  from: string // YYYY-MM-DD
  to: string // YYYY-MM-DD
}

export const useGetDashboardSummary = ({
  from,
  to,
}: UseGetDashboardSummaryArgs) => {
  const shouldFetch = Boolean(from && to)

  const { authFetcher } = useFetcher()

  const { data, error, isLoading, isValidating, mutate } =
    useSWR<DashboardSummary>(
      shouldFetch
        ? `${env.API_URL}/dashboard/summary?from=${from}&to=${to}`
        : null,
      authFetcher,
      {
        revalidateOnFocus: false,
        revalidateIfStale: false,
      },
    )

  return { data, isLoading, isValidating, error, mutate }
}
