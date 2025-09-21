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

type TransactionCategoryFieldProps = {
  categories: ComboboxOption[]
  isLoading: boolean
}

const TransactionCategoryField = ({
  categories,
  isLoading,
}: TransactionCategoryFieldProps) => {
  const t = useTranslations('TransactionsPage.Form.Fields')
  const { control } = useFormContext<TransactionFormInferType>()

  return (
    <FormFieldItem
      control={control}
      name={transactionFormFieldNames.category}
      label={t('category')}
      renderControl={(field) =>
        isLoading ? (
          <div className="h-9 w-full bg-muted animate-pulse rounded-md" />
        ) : (
          <Combobox
            options={categories}
            value={field.value || ''}
            setValue={field.onChange}
          />
        )
      }
    />
  )
}

export default TransactionCategoryField
