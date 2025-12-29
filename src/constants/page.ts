import { PiggyBank, Settings } from 'lucide-react'
import type { Locale } from './locale'

export const PAGES = {
  HOME: '/',
  SETTINGS: '/settings',
} as const

export type PageKey = keyof typeof PAGES

/**
 * Menu items for the sidebar
 */
export const MENU_ITEMS = [
  {
    titleKey: 'home',
    url: PAGES.HOME,
    icon: PiggyBank,
  },
  {
    titleKey: 'settings',
    url: PAGES.SETTINGS,
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
