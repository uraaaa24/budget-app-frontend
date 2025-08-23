import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

const TransactionForm = () => {
  const t = useTranslations('TransactionsPage')

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="default">
          <Plus />
          {t('addTransaction')}
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>{t('TransactionForm.title')}</SheetTitle>
          <SheetDescription>
            {t('TransactionForm.description')}
          </SheetDescription>
        </SheetHeader>

        {/* TODO: Create Form */}
      </SheetContent>
    </Sheet>
  )
}

export default TransactionForm
