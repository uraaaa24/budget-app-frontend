'use client'

import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { useCreateTransaction } from '../../hooks/use-transaction'
import { useTransactionForm } from '../../hooks/use-transaction-form'
import TransactionFormSheet from '../transaction-form-sheet'

const TransactionForm = () => {
  const t = useTranslations('TransactionsPage')

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

  const transacrionFormMessages = {
    title: t('TransactionForm.title'),
    description: t('TransactionForm.description'),
    submitButton: t('TransactionForm.submit'),
  }

  const tranasctionFormProps = {
    trigger: (
      <Button variant="default" className="cursor-pointer">
        <Plus />
        {t('addTransaction')}
      </Button>
    ),
    form,
    handleSubmit,
    isLoading,
    error,
    ...transacrionFormMessages,
  }

  return (
    <TransactionFormSheet {...tranasctionFormProps} />

    // <Sheet open={open} onOpenChange={handleOpenChange}>
    //   <SheetTrigger asChild>
    //     <Button variant="default" className="cursor-pointer">
    //       <Plus />
    //       {t('addTransaction')}
    //     </Button>
    //   </SheetTrigger>

    //   <SheetContent>
    //     <Form {...form}>
    //       <form
    //         onSubmit={form.handleSubmit(handleSubmit)}
    //         className="flex flex-col h-full"
    //       >
    //         <SheetHeader>
    //           <SheetTitle>{t('TransactionForm.title')}</SheetTitle>
    //           <SheetDescription>
    //             {t('TransactionForm.description')}
    //           </SheetDescription>
    //         </SheetHeader>

    //         <div className="flex flex-col px-8 flex-1 space-y-6">
    //           <TransactionDateField />
    //           <TransactionAmountField />
    //           <TransactionDescriptionField />

    //           {error && (
    //             <div className="text-red-500 text-sm">{error.message}</div>
    //           )}
    //         </div>

    //         <SheetFooter className="gap-2">
    //           <Button type="submit" disabled={isLoading}>
    //             {isLoading ? 'Saving...' : 'Save'}
    //           </Button>
    //           <Button
    //             type="button"
    //             variant="ghost"
    //             onClick={() => setOpen(false)}
    //           >
    //             Cancel
    //           </Button>
    //         </SheetFooter>
    //       </form>
    //     </Form>
    //   </SheetContent>
    // </Sheet>
  )
}

export default TransactionForm
