import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'
import FormFieldItem from '@/components/parts/forms/field-item'
import { Input } from '@/components/ui/input'
import {
  type TransactionFormInferType,
  transactionFormFieldNames,
} from '../../schemas/transaction-form'

const TransactionAmountField = () => {
  const t = useTranslations('TransactionsPage.Form.Fields')
  const { control } = useFormContext<TransactionFormInferType>()

  return (
    <FormFieldItem
      control={control}
      name={transactionFormFieldNames.amount}
      label={t('amount')}
      renderControl={(field) => (
        <Input
          {...field}
          type="number"
          min="0"
          step="1"
          value={field.value?.toString() || ''}
          onChange={(e) => {
            const value = e.target.value === '' ? 0 : parseFloat(e.target.value)
            field.onChange(value)
          }}
          className="hide-spin"
        />
      )}
    />
  )
}

export default TransactionAmountField
