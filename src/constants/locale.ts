/**
 * Supported locales for the application
 */
export const locales = ['en', 'ja'] as const

/**
 * Type representing the supported locales.
 */
export type Locale = (typeof locales)[number]

/**
 * Default locale for the application.
 */
export const defaultLocale: Locale = 'en'
