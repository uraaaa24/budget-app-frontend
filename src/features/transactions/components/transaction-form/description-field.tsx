import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'
import FormFieldItem from '@/components/parts/forms/field-item'
import { Textarea } from '@/components/ui/textarea'
import {
  type TransactionFormInferType,
  transactionFormFieldNames,
} from '../../schemas/transaction-form'

const DESCRIPTION_TEXTAREA_ROWS = 3

const TransactionDescriptionField = () => {
  const t = useTranslations('TransactionsPage.Form.Fields')
  const { control } = useFormContext<TransactionFormInferType>()

  return (
    <FormFieldItem
      control={control}
      name={transactionFormFieldNames.description}
      label={t('description')}
      renderControl={(field) => (
        <Textarea
          {...field}
          rows={DESCRIPTION_TEXTAREA_ROWS}
          className="resize-none"
        />
      )}
    />
  )
}

export default TransactionDescriptionField
