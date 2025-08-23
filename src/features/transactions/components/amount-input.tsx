import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'
import FormFieldItem from '@/components/parts/forms/field-item'
import { Input } from '@/components/ui/input'
import type { TransactionFormValues } from './transaction-form'

const AmountInput = () => {
  const t = useTranslations('TransactionsPage.TransactionForm.Fields')

  const { control } = useFormContext<TransactionFormValues>()

  return (
    <FormFieldItem
      control={control}
      name="amount"
      label={t('amount')}
      renderControl={(field) => (
        <Input
          {...field}
          type="number"
          min="0"
          step="1"
          className="hide-spin"
        />
      )}
    />
  )
}

export default AmountInput
