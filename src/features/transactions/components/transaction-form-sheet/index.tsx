import { useState } from 'react'
import type { UseFormReturn } from 'react-hook-form'
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
import type { TransactionFormInferType } from '../../schemas/transaction-form'
import TransactionAmountField from '../transaction-form/amount-field'
import TransactionDateField from '../transaction-form/date-field'
import TransactionDescriptionField from '../transaction-form/description-field'

type TransactionFormSheetMessages = {
  title: string
  description: string
  submitButton: string
}

type TransactionFormSheetProps = TransactionFormSheetMessages & {
  trigger: React.ReactNode
  form: UseFormReturn<TransactionFormInferType>
  handleSubmit: (values: TransactionFormInferType) => Promise<void>
  isLoading: boolean
  error: Error | null
}

const TransactionFormSheet = ({
  trigger,
  form,
  handleSubmit,
  isLoading,
  error,
  ...messages
}: TransactionFormSheetProps) => {
  const [open, setOpen] = useState(false)

  const handleOpenChange = (next: boolean) => {
    setOpen(next)
    if (!next) form.reset()
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>

      <SheetContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col h-full"
          >
            <SheetHeader>
              <SheetTitle>{messages.title}</SheetTitle>
              <SheetDescription>{messages.description}</SheetDescription>
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
                {isLoading ? 'Saving...' : messages.submitButton}
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

export default TransactionFormSheet
