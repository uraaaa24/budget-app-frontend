/**
 * Transaction Type Constants
 */
const TransactionType = {
  INCOME: 'income',
  EXPENSE: 'expense',
} as const
export type TransactionType =
  (typeof TransactionType)[keyof typeof TransactionType]

/**
 * Represents a financial transaction.
 */
export type Transaction = {
  id: string
  type: TransactionType
  amount: number
  occurredAt: string
  category: string
  account: string
  description: string
}
