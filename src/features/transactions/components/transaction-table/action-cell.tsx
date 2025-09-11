import { zodResolver } from '@hookform/resolvers/zod'
import { Pencil } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import DeleteIconButton from '@/components/parts/buttons/delete-icon-button'
import EditIconButton from '@/components/parts/buttons/edit-icon-button'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  useDeleteTransaction,
  useGetTransactions,
  usePutTransaction,
} from '../../hooks/use-transaction'
import {
  type TransactionFormInferType,
  transactionFormSchema,
} from '../../schemas/transaction-form'
import TransactionAmountField from '../transaction-form/amount-field'
import TransactionDateField from '../transaction-form/date-field'
import TransactionDescriptionField from '../transaction-form/description-field'
import type { TransactionTableRow } from '.'

type TransactionDeleteActionProps = {
  transactionId: string
}

const TransactionDeleteAction = ({
  transactionId,
}: TransactionDeleteActionProps) => {
  const utilT = useTranslations('Utils')

  const [isOpen, setIsOpen] = useState(false)

  const { deleteTransaction, isLoading } = useDeleteTransaction(transactionId)
  const { mutate } = useGetTransactions()

  const handleDelete = async () => {
    if (isLoading) return

    await deleteTransaction()
    await mutate()
    setIsOpen(false)
  }

  const handleCancel = () => setIsOpen(false)

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <DeleteIconButton />
      </PopoverTrigger>
      <PopoverContent className="w-48" align="center" side="top">
        <div className="space-y-3">
          <p className="text-sm text-gray-700 text-center">
            {utilT('Message.deleteConfirm')}
          </p>
          <div className="flex justify-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleCancel}>
              {utilT('Action.cancel')}
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
              disabled={isLoading}
            >
              {utilT('Action.delete')}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

type TransactionEditActionProps = {
  transaction: TransactionTableRow
}

const TransactionEditAction = ({ transaction }: TransactionEditActionProps) => {
  const t = useTranslations('TransactionsPage')

  const { putTransaction, error, isLoading } = usePutTransaction(transaction.id)
  const { mutate } = useGetTransactions()

  const [open, setOpen] = useState(false)

  const form = useForm<TransactionFormInferType>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      type: transaction.type,
      amount: transaction.amount,
      occurredAt: new Date(transaction.occurredAt),
      description: transaction.description ?? '',
    },
  })

  const onSubmit = async (values: TransactionFormInferType) => {
    try {
      await putTransaction(values)
      await mutate()
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
        <EditIconButton />
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

type TransactionActionCellProps = {
  transaction: TransactionTableRow
}

const TransactionActionCell = ({ transaction }: TransactionActionCellProps) => {
  return (
    <div className="flex space-x-2">
      <TransactionEditAction transaction={transaction} />
      <TransactionDeleteAction transactionId={transaction.id} />
    </div>
  )
}

export default TransactionActionCell
