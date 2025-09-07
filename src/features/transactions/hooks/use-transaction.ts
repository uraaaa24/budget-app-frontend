'use client'

import { useCallback } from 'react'
import useSWR from 'swr'
import { CRUD_METHODS } from '@/constants/api'
import { useFetcher, useMutation } from '@/hooks/use-swr'
import type { TransactionFormInferType } from '../schemas/transaction-form'
import type {
  CreateTransactionRequest,
  CreateTransactionResponse,
  GetTransactionsResponse,
} from '../types/api'

export const useGetTransactions = () => {
  const { authFetcher } = useFetcher()

  const { data, error, isLoading } = useSWR<GetTransactionsResponse>(
    'http://localhost:8000/transactions',
    authFetcher,
  )

  return { data, isLoading, error }
}

export const useCreateTransaction = () => {
  const {
    trigger,
    data,
    error,
    isMutating: isLoading,
  } = useMutation<CreateTransactionRequest, CreateTransactionResponse>(
    'http://localhost:8000/transactions',
    CRUD_METHODS.POST,
  )

  const createTransaction = useCallback(
    (transactionData: TransactionFormInferType) => {
      const data: CreateTransactionRequest = {
        type: transactionData.type,
        amount: transactionData.amount,
        occurred_at: transactionData.occurredAt,
        description: transactionData.description,
      }

      return trigger(data)
    },
    [trigger],
  )

  return {
    createTransaction,
    data,
    error,
    isLoading,
  }
}
