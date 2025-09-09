import { useTranslations } from 'next-intl'
import { useState } from 'react'
import DeleteIconButton from '@/components/parts/buttons/delete-icon-button'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  useDeleteTransaction,
  useGetTransactions,
} from '../../hooks/use-transaction'
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

type TransactionActionCellProps = {
  transaction: TransactionTableRow
}

const TransactionActionCell = ({ transaction }: TransactionActionCellProps) => {
  return (
    <div className="flex space-x-2">
      <TransactionDeleteAction transactionId={transaction.id} />
    </div>
  )
}

export default TransactionActionCell
