'use client'

import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { useCreateTransaction } from '../../hooks/use-transaction'
import { useTransactionForm } from '../../hooks/use-transaction-form'
import TransactionFormDrawer from '../transaction-form-drawer'

const TransactionForm = () => {
  const utilT = useTranslations('Utils.Actions')
  const t = useTranslations('TransactionsPage.Form.Create')

  const { createTransaction, error, isLoading } = useCreateTransaction()

  const { form, handleSubmit } = useTransactionForm({
    defaultValues: {
      type: 'expense',
      amount: 0,
      occurredAt: new Date(),
      description: '',
    },
    onSubmit: async (values) => {
      await createTransaction(values)
    },
  })

  const transactionFormMessages = {
    title: t('title'),
    description: t('description'),
    submit: utilT('save'),
    cancel: utilT('close'),
    isLoading: utilT('loading'),
  }

  const transactionFormProps = {
    trigger: (
      <Button variant="default" className="cursor-pointer">
        <Plus />
        {t('button')}
      </Button>
    ),
    form,
    onSubmit: handleSubmit,
    isLoading,
    error,
    messages: transactionFormMessages,
  }

  return <TransactionFormDrawer {...transactionFormProps} />
}

export default TransactionForm
