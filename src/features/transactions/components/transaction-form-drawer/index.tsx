import { useMemo } from 'react'
import FormDrawer, {
  type FormDrawerProps,
} from '@/components/parts/forms/form-drawer'
import { useGetTransactionCategories } from '@/features/categories/hooks/use-category'
import type { TransactionFormInferType } from '../../schemas/transaction-form'
import TransactionAmountField from '../transaction-form/amount-field'
import TransactionCategoryField from '../transaction-form/category-field'
import TransactionDateField from '../transaction-form/date-field'
import TransactionDescriptionField from '../transaction-form/description-field'
import TransactionTypeField from '../transaction-form/type-field'

type TransactionFormDrawerProps = Omit<
  FormDrawerProps<TransactionFormInferType>,
  'children'
>

const TransactionFormDrawer = (props: TransactionFormDrawerProps) => {
  const { data, isLoading } = useGetTransactionCategories()
  const categoryOptions = useMemo(() => {
    return (
      data?.categories.map((category) => ({
        id: category.id,
        label: category.name,
      })) || []
    )
  }, [data])

  return (
    <FormDrawer<TransactionFormInferType> {...props}>
      <TransactionTypeField />
      <TransactionDateField />
      <TransactionAmountField />
      <TransactionCategoryField
        categories={categoryOptions}
        isLoading={isLoading}
      />
      <TransactionDescriptionField />
    </FormDrawer>
  )
}

export default TransactionFormDrawer
