'use client'

import { PiggyBank, Settings } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

const ITEMS = [
  {
    key: 'home',
    href: '/',
    Icon: PiggyBank,
  },
  {
    key: 'settings',
    href: '/settings',
    Icon: Settings,
  },
] as const

type ItemKey = (typeof ITEMS)[number]['key']

const MobileBottomNav = () => {
  const pathname = usePathname()
  const t = useTranslations('Navigation')

  const isSettingsPath =
    pathname === '/settings' || pathname.endsWith('/settings')

  const isActive = (key: ItemKey) => {
    if (key === 'settings') return isSettingsPath
    return !isSettingsPath
  }

  return (
    <nav className="sm:hidden fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex h-16 items-center justify-around">
          {ITEMS.map(({ key, href, Icon }) => {
            const active = isActive(key)

            return (
              <Link
                key={key}
                href={href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex flex-col items-center justify-center gap-1 px-4 py-2',
                  'text-xs font-medium transition-colors',
                  active
                    ? 'text-green-600'
                    : 'text-gray-500 hover:text-green-600/70',
                )}
              >
                <Icon className={cn('size-6', active && 'text-green-600')} />
                <span>{t(key)}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export default MobileBottomNav
