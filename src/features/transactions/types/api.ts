import type { TransactionType } from './transaction'

export type CategorySummary = {
  id: string
  name: string
}

type Transaction = {
  id: number
  type: TransactionType
  amount: number
  occurred_at: Date
  category: CategorySummary | null
  description?: string
  created_at: string
  updated_at: string
}

export type GetTransactionsResponse = {
  transactions: Transaction[]
}

export type CreateTransactionRequest = {
  type: TransactionType
  amount: number
  category_id: string | undefined
  occurred_at: Date
  description?: string
}

export type PutTransactionRequest = CreateTransactionRequest

export type PutTransactionResponse = {
  message?: string
}

export type CreateTransactionResponse = {
  transaction: Transaction
}
