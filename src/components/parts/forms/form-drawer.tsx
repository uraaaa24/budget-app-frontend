import { type ReactNode, useState } from 'react'
import type { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

type FormDrawerMessages = {
  title: string
  description: string
  submit: string
  cancel: string
  isLoading: string
}

export type FormDrawerProps<
  /** Raw form input values (direct from fields) */
  TFieldValues extends FieldValues = FieldValues,
  /** Extra context for resolver/validation */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TContext = any,
  /** Values after resolver transform (defaults to TFieldValues) */
  TTransformedValues = TFieldValues,
> = {
  trigger: ReactNode
  form: UseFormReturn<TFieldValues, TContext, TTransformedValues>
  onSubmit: (values: TTransformedValues) => Promise<void>
  isLoading: boolean
  error: Error | null
  messages: FormDrawerMessages
  children: ReactNode
}

const FormDrawer = <
  TFieldValues extends FieldValues = FieldValues,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TContext = any,
  TTransformedValues = TFieldValues,
>({
  trigger,
  form,
  onSubmit,
  isLoading,
  error,
  messages,
  children,
}: FormDrawerProps<TFieldValues, TContext, TTransformedValues>) => {
  const [open, setOpen] = useState(false)

  const handleOpenChange = (next: boolean) => {
    setOpen(next)
    if (!next) form.reset()
  }

  const handleSubmit: SubmitHandler<TTransformedValues> = async (values) => {
    await onSubmit(values)
    handleOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>

      <SheetContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col h-full"
          >
            <SheetHeader>
              <SheetTitle>{messages.title}</SheetTitle>
              <SheetDescription>{messages.description}</SheetDescription>
            </SheetHeader>

            <div className="flex flex-col px-8 flex-1 space-y-6">
              {children}

              {error && (
                <div className="text-red-500 text-sm">{error.message}</div>
              )}
            </div>

            <SheetFooter className="gap-2">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? messages.isLoading : messages.submit}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpen(false)}
              >
                {messages.cancel}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}

export default FormDrawer
