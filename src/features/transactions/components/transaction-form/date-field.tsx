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
import { formatForDisplay, parseYmdToDate } from '@/lib/date'
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
      renderControl={(field) => {
        // field.value は Date | string | undefined のどれでも耐えられるように
        const selectedDate = parseYmdToDate(field.value)

        return (
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !field.value && 'text-muted-foreground',
                  )}
                >
                  {field.value
                    ? formatForDisplay(field.value)
                    : t('selectDate')}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  if (!date) return
                  // ★ ここは「フォームが Date 前提か string 前提か」によって変える

                  // 1) 今は z.date() / Date 型で運用しているなら：
                  field.onChange(date)

                  // 2) フォームを "YYYY-MM-DD" の string に寄せたいなら：
                  // field.onChange(formatDateToYmd(date))
                }}
                disabled={(date) =>
                  date > new Date() || date < new Date('1900-01-01')
                }
              />
            </PopoverContent>
          </Popover>
        )
      }}
    />
  )
}

export default TransactionDateField
