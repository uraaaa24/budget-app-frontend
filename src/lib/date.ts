import type { Locale } from 'next-intl'

const DAY_MS = 24 * 60 * 60 * 1000

/**
 * Parse a date value in "YYYY-MM-DD" format or Date object into a Date object.
 *
 * @param value
 * @returns
 */
export const parseYmdToDate = (
  value: string | Date | null | undefined,
): Date | undefined => {
  if (!value) return undefined

  if (typeof value === 'string') {
    // strict check for "YYYY-MM-DD"
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined

    const [y, m, d] = value.split('-').map(Number)
    if (!Number.isInteger(y) || !Number.isInteger(m) || !Number.isInteger(d)) {
      return undefined
    }

    const date = new Date(y, m - 1, d)

    // Invalid date check and cross-check components(eg. 2023-02-30 -> 2023-03-02)
    if (
      date.getFullYear() !== y ||
      date.getMonth() + 1 !== m ||
      date.getDate() !== d
    ) {
      return undefined
    }

    return date
  }

  return undefined
}

/**
 * Local start of day
 */
export const startOfDay = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export const startOfDayMs = (date: Date): number => {
  return startOfDay(date).getTime()
}

/**
 * Format a Date into YYYY-MM-DD (local time, no timezone shift).
 *
 * @param date - The Date to format.
 * @returns The formatted date string in YYYY-MM-DD format.
 */
export const formatDateToYmd = (date: Date): string => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/**
 * Format a date value (string in "YYYY-MM-DD" format or Date object) for display in "ja-JP" locale.
 *
 * @param value
 * @returns
 */
export const formatForDisplay = (
  value: string | Date | null | undefined,
  locale?: Locale,
  optons?: Intl.DateTimeFormatOptions,
): string => {
  const date = value instanceof Date ? value : parseYmdToDate(value)
  if (!date) return ''

  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    ...optons,
  }).format(date)
}

/**
 * Get the period for the current month in YYYY-MM-DD format.
 */
export const getThisMonthPeriod = (
  now: Date = new Date(),
): { from: string; to: string } => {
  const from = formatDateToYmd(new Date(now.getFullYear(), now.getMonth(), 1))
  const to = formatDateToYmd(now)
  return { from, to }
}

/**
 * Format a Date into YYYY-MM-DD (local time, no timezone shift).
 */
export const dateFormatter = (
  date: Date,
  locale?: Locale,
  options?: Intl.DateTimeFormatOptions,
) => {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    ...options,
  }).format(date)
}

export const diffDaysFromToday = (
  target: Date,
  now: Date = new Date(),
): number => {
  const targetMs = startOfDayMs(target)
  const todayMs = startOfDayMs(now)
  return Math.floor((todayMs - targetMs) / DAY_MS)
}

export const formatRelativeDayLabel = (
  value: string | Date,
  locale: Locale = 'ja',
): string => {
  const date = value instanceof Date ? startOfDay(value) : parseYmdToDate(value)
  if (!date) return ''

  const diff = diffDaysFromToday(date)

  if (diff === 0) return 'Today'
  if (diff === 1) return 'Yesterday'

  return new Intl.DateTimeFormat(locale, {
    month: 'numeric',
    day: 'numeric',
  }).format(date)
}
