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
import type { Transaction } from '@/features/transactions/types/transaction'
import {
  useDeleteTransaction,
  useGetTransactions,
  usePutTransaction,
} from '../../../hooks/use-transaction'
import { useTransactionForm } from '../../../hooks/use-transaction-form'
import TransactionFormDrawer from '../../transaction-form-drawer'
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
            {utilT('Messages.deleteConfirm')}
          </p>
          <div className="flex justify-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleCancel}>
              {utilT('Actions.cancel')}
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
              disabled={isLoading}
            >
              {utilT('Actions.delete')}
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
  const utilT = useTranslations('Utils.Actions')
  const t = useTranslations('TransactionsPage.Form.Edit')

  const { putTransaction, error, isLoading } = usePutTransaction(transaction.id)
  const { mutate } = useGetTransactions()

  const { form, handleSubmit } = useTransactionForm({
    defaultValues: {
      type: transaction.type,
      amount: transaction.amount,
      categoryId: transaction.category?.id,
      occurredAt: transaction.occurredAt,
      description: transaction.description ?? '',
    },
    onSubmit: async (values) => {
      await putTransaction(values)
      await mutate()
    },
  })

  const transactionFormMessages = {
    title: t('title'),
    description: t('description'),
    submit: utilT('update'),
    cancel: utilT('cancel'),
    isLoading: utilT('loading'),
  }

  const tranasctionFormProps = {
    trigger: <EditIconButton />,
    form,
    onSubmit: handleSubmit,
    isLoading,
    error,
    messages: transactionFormMessages,
  }

  return <TransactionFormDrawer {...tranasctionFormProps} />
}

type TransactionActionCellProps = {
  transaction: Transaction
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
