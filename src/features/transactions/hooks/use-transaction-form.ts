'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { formatDateToYmd } from '@/lib/date'
import {
  type TransactionFormInferType,
  transactionFormSchema,
} from '../schemas/transaction-form'
import { TRANSACTION_TYPE } from '../types/transaction'

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
      type: TRANSACTION_TYPE.EXPENSE,
      amount: 0,
      occurredAt: formatDateToYmd(new Date()),
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
