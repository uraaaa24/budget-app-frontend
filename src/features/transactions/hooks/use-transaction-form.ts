'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  type TransactionFormInferType,
  transactionFormSchema,
} from '../schemas/transaction-form'

type UseTransactionFormProps<TReturn = unknown> = {
  defaultValues?: TransactionFormInferType
  onSubmit: (values: TransactionFormInferType) => Promise<TReturn> | TReturn
}

export const useTransactionForm = ({
  defaultValues,
  onSubmit,
}: UseTransactionFormProps) => {
  const form = useForm<TransactionFormInferType>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: defaultValues ?? {
      type: 'expense',
      amount: 0,
      occurredAt: new Date(),
      description: '',
    },
  })

  const handleSubmit = async (values: TransactionFormInferType) => {
    await onSubmit(values)
    form.reset()
  }

  return {
    form,
    handleSubmit,
  }
}
