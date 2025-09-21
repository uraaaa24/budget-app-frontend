import useSWR from 'swr'
import { useFetcher } from '@/hooks/use-swr'
import type { GetCategoriesResponse } from '../types/api'

export const useGetTransactionCategories = () => {
  const { authFetcher } = useFetcher()

  const { data, error, isLoading, isValidating, mutate } =
    useSWR<GetCategoriesResponse>(
      'http://localhost:8000/categories',
      authFetcher,
      { revalidateOnFocus: false, revalidateIfStale: false },
    )

  return { data, isLoading, isValidating, error, mutate }
}
