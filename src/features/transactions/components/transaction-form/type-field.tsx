import { ArrowDown, ArrowUp } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'
import FormFieldItem from '@/components/parts/forms/field-item'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { cn } from '@/lib/utils'
import {
  type TransactionFormInferType,
  transactionFormFieldNames,
} from '../../schemas/transaction-form'
import { TRANSACTION_TYPE } from '../../types/transaction'

const TransactionTypeField = () => {
  const t = useTranslations('TransactionsPage.Form.Fields.Type')
  const { control } = useFormContext<TransactionFormInferType>()

  return (
    <FormFieldItem
      control={control}
      name={transactionFormFieldNames.type}
      label={t('label')}
      renderControl={(field) => (
        <ToggleGroup
          type="single"
          value={field.value ?? TRANSACTION_TYPE.EXPENSE}
          onValueChange={(val) => val && field.onChange(val)}
          className="grid grid-cols-2 gap-1 rounded-md border bg-gray-50 p-1"
        >
          <ToggleGroupItem
            value={TRANSACTION_TYPE.EXPENSE}
            aria-label={t('expense')}
            className={cn(
              'cursor-pointer flex items-center justify-center gap-2 rounded-sm text-sm font-medium',
              'data-[state=on]:bg-background data-[state=on]:shadow-sm data-[state=on]:text-destructive',
              'transition-colors',
            )}
          >
            <ArrowDown className="size-4" />
            {t('expense')}
          </ToggleGroupItem>
          <ToggleGroupItem
            value={TRANSACTION_TYPE.INCOME}
            aria-label={t('income')}
            className={cn(
              'cursor-pointer flex items-center justify-center gap-2 rounded-sm text-sm font-medium',
              'data-[state=on]:bg-background data-[state=on]:shadow-sm data-[state=on]:text-emerald-600',
              'transition-colors',
            )}
          >
            <ArrowUp className="size-4" />
            {t('income')}
          </ToggleGroupItem>
        </ToggleGroup>
      )}
    />
  )
}

export default TransactionTypeField
