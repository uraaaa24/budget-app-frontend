import type { Locale } from './locale'

export const TRANSACTIONS_PAGE = '/transactions'

/**
 * Generates a localized path by prepending the locale to the given path.
 */
export const localizePath = (locale: Locale, path: string): string =>
  `/${locale}${path.startsWith('/') ? path : `/${path}`}`
