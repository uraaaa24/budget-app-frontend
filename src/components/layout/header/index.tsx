'use client'

import {
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import type { Locale } from '@/constants/locale'
import { MENU_ITEMS } from '@/constants/page'

const Header = () => {
  const pathname = usePathname()
  const locale = useLocale() as Locale
  const t = useTranslations('Navigation')

  const basePath = pathname.replace(`/${locale}`, '') || '/'
  const titleKey = MENU_ITEMS.find((item) => item.url === basePath)?.titleKey
  const pageTitle = titleKey ? t(titleKey) : 'Budget App'

  return (
    <header className="flex h-24 items-center px-16">
      <h1 className="font-heading flex-1 text-3xl font-bold text-gray-900">
        {pageTitle}
      </h1>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>

      <SignedIn>
        <UserButton
          showName
          appearance={{
            elements: {
              userButtonBox: 'flex flex-col items-center gap-2',
              userButtonAvatarBox: 'w-14 h-14',
              userButtonOuterIdentifier: 'order-2 text-sm',
            },
          }}
        />
      </SignedIn>
    </header>
  )
}

export default Header
