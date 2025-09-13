import { useTranslations } from 'next-intl'
import { useState } from 'react'
import DeleteIconButton from '@/components/parts/buttons/delete-icon-button'
import EditIconButton from '@/components/parts/buttons/edit-icon-button'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  useDeleteTransaction,
  useGetTransactions,
  usePutTransaction,
} from '../../hooks/use-transaction'
import { useTransactionForm } from '../../hooks/use-transaction-form'
import TransactionFormSheet from '../transaction-form-sheet'
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

  const { form, handleSubmit } = useTransactionForm({
    defaultValues: {
      type: transaction.type,
      amount: transaction.amount,
      occurredAt: new Date(transaction.occurredAt),
      description: transaction.description ?? '',
    },
    onSubmit: async (values) => {
      await putTransaction(values)
      await mutate()
    },
  })

  const transacrionFormMessages = {
    title: t('TransactionForm.editTitle'),
    description: t('TransactionForm.editDescription'),
    submitButton: t('TransactionForm.update'),
  }

  const tranasctionFormProps = {
    trigger: <EditIconButton />,
    form,
    handleSubmit,
    isLoading,
    error,
    ...transacrionFormMessages,
  }

  return <TransactionFormSheet {...tranasctionFormProps} />
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
