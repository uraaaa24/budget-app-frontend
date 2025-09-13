import FormDrawer, {
  type FormDrawerProps,
} from '@/components/parts/forms/form-drawer'
import type { TransactionFormInferType } from '../../schemas/transaction-form'
import TransactionAmountField from '../transaction-form/amount-field'
import TransactionDateField from '../transaction-form/date-field'
import TransactionDescriptionField from '../transaction-form/description-field'

type TransactionFormDrawerProps = Omit<
  FormDrawerProps<TransactionFormInferType>,
  'children'
>

const TransactionFormDrawer = (props: TransactionFormDrawerProps) => {
  return (
    <FormDrawer<TransactionFormInferType> {...props}>
      <TransactionDateField />
      <TransactionAmountField />
      <TransactionDescriptionField />
    </FormDrawer>
  )
}

export default TransactionFormDrawer
