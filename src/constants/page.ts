import type { Locale } from './locale'

export const HOME_PAGE = '/'
export const TRANSACTIONS_PAGE = '/transactions'
export const SETTINGS_PAGE = '/settings'

/**
 * Generates a localized path by prepending the locale to the given path.
 */
export const localizePath = (locale: Locale, path: string): string =>
  `/${locale}${path.startsWith('/') ? path : `/${path}`}`
