import { CalendarIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'
import FormFieldItem from '@/components/parts/forms/field-item'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { FormControl } from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import {
  type TransactionFormInferType,
  transactionFormFieldNames,
} from '../../schemas/transaction-form'

const TransactionDateField = () => {
  const t = useTranslations('TransactionsPage.Form.Fields')
  const { control } = useFormContext<TransactionFormInferType>()

  return (
    <FormFieldItem
      control={control}
      name={transactionFormFieldNames.occurredAt}
      label={t('date')}
      renderControl={(field) => (
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant={'outline'}
                className={cn(
                  'text-left font-normal',
                  !field.value && 'text-muted-foreground',
                )}
              >
                {field.value
                  ? field.value.toLocaleDateString()
                  : t('selectDate')}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={field.value}
              onSelect={(date) => date && field.onChange(date)}
              disabled={(date) =>
                date > new Date() || date < new Date('1900-01-01')
              }
            />
          </PopoverContent>
        </Popover>
      )}
    />
  )
}

export default TransactionDateField
