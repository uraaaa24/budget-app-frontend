'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
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
import AmountInput from './amount-input'
import FormDateField from './date-input'

export const transactionFormFieldNames = {
  date: 'date',
  amount: 'amount',
} as const

export const transactionFormSchema = z.object({
  [transactionFormFieldNames.date]: z.date(),
  [transactionFormFieldNames.amount]: z.number().min(0.01),
})
export type TransactionFormValues = z.infer<typeof transactionFormSchema>

const TransactionForm = () => {
  const t = useTranslations('TransactionsPage')

  const [open, setOpen] = useState(false)

  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      date: new Date(),
      amount: 0,
    },
  })

  const onSubmit = async (values: TransactionFormValues) => {
    try {
      console.log(values)
      // await api.createTransaction(values)
      setOpen(false)
      form.reset() // 閉じた後に初期化
    } catch (e) {
      console.error(e)
    }
  }

  const handleOpenChange = (next: boolean) => {
    setOpen(next)
    // 閉じるときにフォームをリセット（編集中の値を捨てたい場合）
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
        <SheetHeader>
          <SheetTitle>{t('TransactionForm.title')}</SheetTitle>
          <SheetDescription>
            {t('TransactionForm.description')}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col px-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormDateField />
              <AmountInput />
            </form>
          </Form>
        </div>

        <SheetFooter className="gap-2">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            Save
          </Button>
          <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default TransactionForm
