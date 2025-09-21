import type { TransactionType } from '@/features/transactions/types/transaction'

type Category = {
  id: string
  type: TransactionType
  name: string
  description: string
  updated_at: string
  created_at: string
}

export type GetCategoriesResponse = {
  categories: Category[]
}
