'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useCreateTransaction } from '../../hooks/use-transaction'
import {
  type TransactionFormInferType,
  transactionFormSchema,
} from '../../schemas/transaction-form'
import TransactionAmountField from './amount-field'
import TransactionDateField from './date-field'
import TransactionDescriptionField from './description-field'

const TransactionForm = () => {
  const t = useTranslations('TransactionsPage')

  const { createTransaction, error, isLoading } = useCreateTransaction()

  const [open, setOpen] = useState(false)

  const form = useForm<TransactionFormInferType>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      type: 'expense',
      amount: 0,
      occurredAt: new Date(),
      description: '',
    },
  })

  const onSubmit = async (values: TransactionFormInferType) => {
    try {
      await createTransaction(values)
      setOpen(false)
      form.reset()
    } catch (error) {
      console.error('Transaction creation failed:', error)
    }
  }

  const handleOpenChange = (next: boolean) => {
    setOpen(next)
    if (!next) form.reset()
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button variant="default" className="cursor-pointer">
          <Plus />
          {t('addTransaction')}
        </Button>
      </SheetTrigger>

      <SheetContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col h-full"
          >
            <SheetHeader>
              <SheetTitle>{t('TransactionForm.title')}</SheetTitle>
              <SheetDescription>
                {t('TransactionForm.description')}
              </SheetDescription>
            </SheetHeader>

            <div className="flex flex-col px-8 flex-1 space-y-6">
              <TransactionDateField />
              <TransactionAmountField />
              <TransactionDescriptionField />

              {error && (
                <div className="text-red-500 text-sm">{error.message}</div>
              )}
            </div>

            <SheetFooter className="gap-2">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save'}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}

export default TransactionForm
