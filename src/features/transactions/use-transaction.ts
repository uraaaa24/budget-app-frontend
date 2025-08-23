import useSWR from 'swr'
import { useFetcher } from '@/hooks/use-fetcher'
import type { Transaction } from './transaction-type'

export const useGetTransactions = () => {
  const { authFetcher } = useFetcher()

  const { data, error, isLoading } = useSWR<Transaction[]>(
    'http://localhost:8000/transactions',
    authFetcher,
  )

  return { data, isLoading, error }
}
