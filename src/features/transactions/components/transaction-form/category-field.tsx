import { useTranslations } from 'next-intl'
import { useEffect, useMemo, useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import Combobox, {
  type ComboboxOption,
} from '@/components/parts/forms/combobox'
import FormFieldItem from '@/components/parts/forms/field-item'
import type { Category } from '@/features/categories/types/api'
import {
  type TransactionFormInferType,
  transactionFormFieldNames,
} from '../../schemas/transaction-form'

type TransactionCategoryFieldProps = {
  categories: Category[]
  isLoading: boolean
}

const TransactionCategoryField = ({
  categories,
  isLoading,
}: TransactionCategoryFieldProps) => {
  const t = useTranslations('TransactionsPage.Form.Fields')

  const { control, watch, setValue } =
    useFormContext<TransactionFormInferType>()
  const transactionType = watch(transactionFormFieldNames.type)
  const currentCategoryId = watch(transactionFormFieldNames.categoryId)

  const lastSelectedByTypeRef = useRef<Record<string, string | undefined>>({})

  /**
   * Handle category change and remember last selected category per transaction type
   */
  const handleCategoryChange = (id: string) => {
    lastSelectedByTypeRef.current[transactionType] = id
    setValue(transactionFormFieldNames.categoryId, id, { shouldDirty: true })
  }

  /**
   * Categories available for the current transaction type
   */
  const filteredCategories: ComboboxOption[] = useMemo(() => {
    return categories
      .filter((c) => c.type === transactionType)
      .map((c) => ({ id: c.id, label: c.name }))
  }, [categories, transactionType])

  // Ensure category stays valid when type or options change
  useEffect(() => {
    const isValidCategoryId = (id?: string) =>
      Boolean(id) && filteredCategories.some((o) => o.id === id)

    // keep current if valid
    if (isValidCategoryId(currentCategoryId)) return

    // restore last valid selection
    const lastSelectedId = lastSelectedByTypeRef.current[transactionType]
    if (isValidCategoryId(lastSelectedId)) {
      setValue(transactionFormFieldNames.categoryId, lastSelectedId, {
        shouldDirty: true,
      })
      return
    }

    // otherwise reset
    setValue(transactionFormFieldNames.categoryId, '', { shouldDirty: true })
  }, [transactionType, filteredCategories, currentCategoryId, setValue])

  return (
    <FormFieldItem
      control={control}
      name={transactionFormFieldNames.categoryId}
      label={t('category')}
      renderControl={(field) =>
        isLoading ? (
          <div className="h-9 w-full bg-muted animate-pulse rounded-md" />
        ) : (
          <Combobox
            options={filteredCategories}
            value={field.value || ''}
            setValue={handleCategoryChange}
          />
        )
      }
    />
  )
}

export default TransactionCategoryField
