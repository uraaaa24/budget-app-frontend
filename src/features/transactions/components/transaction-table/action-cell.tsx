import { Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
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
  const { deleteTransaction, isLoading, error } =
    useDeleteTransaction(transactionId)
  const { mutate } = useGetTransactions()

  const handleDelete = async () => {
    if (isLoading) return

    await deleteTransaction()
    await mutate()
  }

  return (
    <Button
      variant="ghost"
      onClick={handleDelete}
      disabled={isLoading}
      className="text-red-600 hover:text-red-800"
    >
      <Trash size={16} />
    </Button>
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
