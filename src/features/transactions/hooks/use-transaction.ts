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
  PutTransactionRequest,
  PutTransactionResponse,
} from '../types/api'

export const useGetTransactions = () => {
  const { authFetcher } = useFetcher()

  const { data, error, isLoading, isValidating, mutate } =
    useSWR<GetTransactionsResponse>(
      'http://localhost:8000/transactions',
      authFetcher,
      { revalidateOnFocus: false, revalidateIfStale: false },
    )

  return { data, isLoading, isValidating, error, mutate }
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

export const usePutTransaction = (id: string) => {
  const {
    trigger,
    data,
    error,
    isMutating: isLoading,
  } = useMutation<PutTransactionRequest, PutTransactionResponse>(
    `http://localhost:8000/transactions/${id}`,
    CRUD_METHODS.PUT,
  )

  const putTransaction = useCallback(
    (transactionData: TransactionFormInferType) => {
      const data: PutTransactionRequest = {
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
    putTransaction,
    data,
    error,
    isLoading,
  }
}

export const useDeleteTransaction = (id: string) => {
  const {
    trigger,
    data,
    error,
    isMutating: isLoading,
  } = useMutation<null, { message: string }>(
    `http://localhost:8000/transactions/${id}`,
    CRUD_METHODS.DELETE,
  )

  const deleteTransaction = useCallback(() => {
    return trigger(null)
  }, [trigger])

  return {
    deleteTransaction,
    data,
    error,
    isLoading,
  }
}
