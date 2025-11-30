'use client'

import { useCallback } from 'react'
import useSWR from 'swr'
import { env } from '@/config/env'
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
      `${env.API_URL}/transactions`,
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
    `${env.API_URL}/transactions`,
    CRUD_METHODS.POST,
  )

  const createTransaction = useCallback(
    (transactionData: TransactionFormInferType) => {
      const data: CreateTransactionRequest = {
        type: transactionData.type,
        amount: transactionData.amount,
        category_id: transactionData.categoryId,
        occurred_at: new Date(transactionData.occurredAt),
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
    `${env.API_URL}/transactions/${id}`,
    CRUD_METHODS.PUT,
  )

  const putTransaction = useCallback(
    (transactionData: TransactionFormInferType) => {
      const data: PutTransactionRequest = {
        type: transactionData.type,
        amount: transactionData.amount,
        category_id: transactionData.categoryId,
        occurred_at: new Date(transactionData.occurredAt),
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
    `${env.API_URL}/transactions/${id}`,
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
