import { Home, PiggyBank, Settings } from 'lucide-react'
import type { Locale } from './locale'

export const HOME_PAGE = '/'
export const TRANSACTIONS_PAGE = '/transactions'
export const SETTINGS_PAGE = '/settings'

/**
 * Menu items for the sidebar
 */
export const MENU_ITEMS = [
  {
    titleKey: 'dashboard',
    url: HOME_PAGE,
    icon: Home,
  },
  {
    titleKey: 'transactions',
    url: TRANSACTIONS_PAGE,
    icon: PiggyBank,
  },
  {
    titleKey: 'settings',
    url: SETTINGS_PAGE,
    icon: Settings,
  },
] as const
export type MenuItem = (typeof MENU_ITEMS)[number]

/**
 * Generates a localized path by prepending the locale to the given path
 */
export const localizePath = (locale: Locale, path: string): string => {
  const normalized = path.startsWith('/') ? path : `/${path}`

  // If the path is just the root, return the localized root path
  if (normalized === '/') return `/${locale}`

  const trimmed = normalized.replace(/\/+$/, '')
  return `/${locale}${trimmed}`
}
