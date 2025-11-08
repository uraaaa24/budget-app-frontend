import useSWR from 'swr'
import { env } from '@/config/env'
import { useFetcher } from '@/hooks/use-swr'
import type { GetCategoriesResponse } from '../types/api'

export const useGetTransactionCategories = () => {
  const { authFetcher } = useFetcher()

  const { data, error, isLoading, isValidating, mutate } =
    useSWR<GetCategoriesResponse>(`${env.API_URL}/categories`, authFetcher, {
      revalidateOnFocus: false,
      revalidateIfStale: false,
    })

  return { data, isLoading, isValidating, error, mutate }
}
