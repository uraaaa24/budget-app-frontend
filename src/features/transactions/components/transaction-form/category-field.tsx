import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'
import Combobox, {
  type ComboboxOption,
} from '@/components/parts/forms/combobox'
import FormFieldItem from '@/components/parts/forms/field-item'
import {
  type TransactionFormInferType,
  transactionFormFieldNames,
} from '../../schemas/transaction-form'

const dummyCategories: ComboboxOption[] = [
  { id: '1', label: 'Food' },
  { id: '2', label: 'Transport' },
  { id: '3', label: 'Shopping' },
]

const TransactionCategoryField = () => {
  const t = useTranslations('TransactionsPage.Form.Fields')
  const { control } = useFormContext<TransactionFormInferType>()

  return (
    <FormFieldItem
      control={control}
      name={transactionFormFieldNames.category}
      label={t('category')}
      renderControl={(field) => (
        <Combobox
          options={dummyCategories}
          value={field.value || ''}
          setValue={field.onChange}
        />
      )}
    />
  )
}

export default TransactionCategoryField
