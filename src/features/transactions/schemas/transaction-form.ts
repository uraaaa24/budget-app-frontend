import { z } from 'zod'

const TransactionType = {
  expense: 'expense',
  income: 'income',
} as const

export const transactionFormFieldNames = {
  type: 'type',
  amount: 'amount',
  categoryId: 'categoryId',
  occurredAt: 'occurredAt',
  description: 'description',
} as const

export const transactionFormSchema = z.object({
  type: z.enum([TransactionType.expense, TransactionType.income]),
  amount: z.number().min(1, { message: 'Amount must be at least 1' }),
  categoryId: z.string().optional(),
  occurredAt: z.string().min(1, { message: 'Date is required' }),
  description: z.string().max(255).optional(),
})
export type TransactionFormInferType = z.infer<typeof transactionFormSchema>
