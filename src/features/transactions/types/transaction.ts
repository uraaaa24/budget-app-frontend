import type { CategorySummary } from './api'

/**
 * Transaction Type Constants
 */
export const TRANSACTION_TYPE = {
  INCOME: 'income',
  EXPENSE: 'expense',
} as const
export type TransactionType =
  (typeof TRANSACTION_TYPE)[keyof typeof TRANSACTION_TYPE]

/**
 * Represents a financial transaction.
 */
export type Transaction = {
  id: string
  type: TransactionType
  amount: number
  occurredAt: string
  category: CategorySummary | null
  // category: string
  // account: string
  description?: string
}
