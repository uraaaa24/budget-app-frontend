'use client'

import {
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Leaf } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { MENU_ITEMS } from '@/constants/page'
import { cn } from '@/lib/utils'

const Header = () => {
  const pathname = usePathname()
  const t = useTranslations('Navigation')

  return (
    <header className="mx-auto flex h-20 items-center rounded-full gap-4 justify-between">
      <div className="flex items-center gap-10">
        <Link href="/" className="flex items-center gap-2">
          <Leaf fill="#16a34a" className="!size-8 text-white" />
          <span className="text-2xl font-bold text-gray-800">Kirokuba</span>
        </Link>

        <div className="flex items-center gap-4">
          {MENU_ITEMS.map((item) => {
            const isActive =
              pathname === item.url || pathname.startsWith(`${item.url}/`)
            return (
              <Link
                key={item.titleKey}
                href={item.url}
                className={cn(
                  'inline-flex items-center font-semibold',
                  isActive
                    ? 'text-green-600'
                    : 'text-gray-500 hover:text-green-600/70 transition-colors',
                )}
              >
                <item.icon className="inline size-5 mr-2" />
                {t(item.titleKey)}
              </Link>
            )
          })}
        </div>
      </div>
      <div className="flex items-center justify-end">
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  )
}

export default Header
