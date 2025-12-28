'use client'

import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { formatDateToYmd } from '@/lib/date'
import { useCreateTransaction } from '../../hooks/use-transaction'
import { useTransactionForm } from '../../hooks/use-transaction-form'
import { TRANSACTION_TYPE } from '../../types/transaction'
import TransactionFormDrawer from '../transaction-form-drawer'

const TransactionForm = () => {
  const utilT = useTranslations('Utils.Actions')
  const t = useTranslations('TransactionsPage.Form.Create')

  const { createTransaction, error, isLoading } = useCreateTransaction()

  const { form, handleSubmit } = useTransactionForm({
    defaultValues: {
      type: TRANSACTION_TYPE.EXPENSE,
      amount: 0,
      occurredAt: formatDateToYmd(new Date()),
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
      <Button
        variant="default"
        size="icon"
        aria-label={t('button')}
        title={t('button')}
        className="rounded-full size-14 sm:rounded-md sm:h-9 sm:w-auto sm:px-4 sm:py-2"
      >
        <Plus className="size-6 sm:size-4" />
        <span className="hidden sm:inline">{t('button')}</span>
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
