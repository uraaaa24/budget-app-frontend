const CURRENCY_LOCALES: Record<string, object> = {
  en: { style: 'currency', currency: 'JPY', minimumFractionDigits: 0 },
}

/**
 * Format amount according to locale
 */
export const formatAmount = (amount: number, locale: string): string => {
  return new Intl.NumberFormat(locale, CURRENCY_LOCALES[locale]).format(amount)
}
