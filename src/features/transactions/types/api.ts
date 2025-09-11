import type { TransactionType } from './transaction'

type Transaction = {
  id: number
  type: TransactionType
  amount: number
  occurred_at: Date
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
