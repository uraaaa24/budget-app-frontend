import type React from 'react'
import type {
  Control,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

type FormFieldItemProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  control: Control<TFieldValues>
  name: TName
  label?: React.ReactNode
  className?: string
  renderControl: (
    field: ControllerRenderProps<TFieldValues, TName>,
  ) => React.ReactNode
}

const FormFieldItem = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  className,
  renderControl,
}: FormFieldItemProps<TFieldValues, TName>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}

          <FormControl className="w-full">{renderControl(field)}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormFieldItem
