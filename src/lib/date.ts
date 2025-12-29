import type { Locale } from 'next-intl'

const DAY_MS = 24 * 60 * 60 * 1000 // milliseconds in a day

/**
 * Branded string types for formatted date strings.
 */
export type FormattedString<Format extends string> = string & {
  readonly __format: Format
}

export type Ym = FormattedString<'YYYY-MM'>
export type Ymd = FormattedString<'YYYY-MM-DD'>

// =============================
// Intl formatter cache
// =============================
const diffCache = new Map<string, Intl.DateTimeFormat>()

const getDtf = (
  locale?: string,
  options?: Intl.DateTimeFormatOptions,
): Intl.DateTimeFormat => {
  const key = `${locale}|${JSON.stringify(options)}`
  const cached = diffCache.get(key)
  if (cached) return cached

  const fmt = new Intl.DateTimeFormat(locale, options)
  diffCache.set(key, fmt)
  return fmt
}

// =============================
// Parse / Format
// =============================
/**
 * Parse a date value in "YYYY-MM-DD" format or Date object into a Date object.
 */
export const parseYmd = (
  value: string | Date | null | undefined,
): Date | undefined => {
  if (!value) return undefined
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? undefined : value
  }

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

/**
 * Backward-compatible alias.
 * Prefer using `parseYmd`.
 */
export const parseYmdToDate = (
  value: string | Date | null | undefined,
): Date | undefined => {
  return parseYmd(value)
}

/**
 * Format a Date into YYYY-MM-DD (local time, no timezone shift).
 */
export const formatDateToYmd = (date: Date): Ymd => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}` as Ymd
}

/**
 * Convert "YYYY-MM" to Date (local, first day of month).
 */
export const parseYmToDate = (
  value: string | null | undefined,
): Date | undefined => {
  if (!value) return undefined
  if (!/^\d{4}-\d{2}$/.test(value)) return undefined

  const [y, m] = value.split('-').map(Number)
  const date = new Date(y, m - 1, 1)

  // cross-check (e.g. 2025-13 -> invalid)
  if (date.getFullYear() !== y || date.getMonth() + 1 !== m) return undefined
  return date
}

/**
 * Format Date -> "YYYY-MM"
 */
export const formatDateToYm = (date: Date): Ym => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  return `${y}-${m}` as Ym
}

// =============================
// Normalize / Diff
// =============================
/**
 * Local start of day
 */
export const startOfDay = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

/**
 * Local start of day in milliseconds
 */
export const startOfDayMs = (date: Date): number => {
  return startOfDay(date).getTime()
}

/**
 * Difference in days between from -> to, based on local start of day.
 */
export const diffDays = (from: Date, to: Date): number => {
  const fromMs = startOfDayMs(from)
  const toMs = startOfDayMs(to)
  return Math.round((toMs - fromMs) / DAY_MS)
}

export const diffDaysFromToday = (
  target: Date,
  now: Date = new Date(),
): number => {
  return diffDays(target, now)
}

// =============================
// Display / Format (Intl)
// =============================
/**
 * Format date-like (YMD string or Date) with Intl.DateTimeFormat.
 * Default: YYYY/MM/DD-ish depending on locale (2-digit month/day).
 */
export const formatDate = (
  value: string | Date | null | undefined,
  locale?: Locale,
  options?: Intl.DateTimeFormatOptions,
): string => {
  const date = value instanceof Date ? value : parseYmd(value)
  if (!date) return ''

  return getDtf(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    ...options,
  }).format(date)
}

/**
 * Backward-compatible alias.
 * Prefer using `formatDate`.
 */
export const formatForDisplay = (
  value: string | Date | null | undefined,
  locale?: Locale,
  options?: Intl.DateTimeFormatOptions,
): string => {
  return formatDate(value, locale, options)
}

const RELATIVE_DAY_KEYS = {
  today: 'today',
  yesterday: 'yesterday',
  date: 'date',
}
type RelativeDayKey = (typeof RELATIVE_DAY_KEYS)[keyof typeof RELATIVE_DAY_KEYS]

const rtfCache = new Map<string, Intl.RelativeTimeFormat>()

const getRtf = (locale?: string): Intl.RelativeTimeFormat => {
  const key = `${locale ?? ''}`
  const cached = rtfCache.get(key)
  if (cached) return cached

  const fmt = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })
  rtfCache.set(key, fmt)
  return fmt
}

/**
 * Relative day label: Today/Yesterday
 */
export const getRelativeDayKey = (
  value: string | Date,
  now: Date = new Date(),
): { key: RelativeDayKey; date?: Date } => {
  const date = value instanceof Date ? startOfDay(value) : parseYmd(value)
  if (!date) return { key: RELATIVE_DAY_KEYS.date }

  const d = diffDaysFromToday(date, now)

  if (d === 0) return { key: RELATIVE_DAY_KEYS.today, date }
  if (d === 1) return { key: RELATIVE_DAY_KEYS.yesterday, date }

  return { key: RELATIVE_DAY_KEYS.date, date }
}

/**
 * Relative day label string for grouping headers.
 * - today/yesterday: localized via Intl.RelativeTimeFormat
 * - otherwise: falls back to formatDate
 */
export const formatRelativeDayLabel = (
  value: string | Date,
  locale?: Locale,
  now: Date = new Date(),
): string => {
  const { key, date } = getRelativeDayKey(value, now)

  if (key === RELATIVE_DAY_KEYS.today) return getRtf(locale).format(0, 'day')
  if (key === RELATIVE_DAY_KEYS.yesterday)
    return getRtf(locale).format(-1, 'day')

  return formatDate(date ?? value, locale)
}

// =============================
// Month utils
// =============================
/**
 * Add months to Ym and return new Ym
 */
export const addMonths = (value: string, delta: number): Ym | undefined => {
  const date = parseYmToDate(value)
  if (!date) return undefined

  date.setMonth(date.getMonth() + delta)
  return formatDateToYm(date)
}

/**
 * Get current year-month in "YYYY-MM" format.
 */
export const getCurrentYearMonth = (now: Date = new Date()): Ym => {
  return formatDateToYm(now)
}

/**
 * Get the period for the current month in YYYY-MM-DD format.
 */
export const getThisMonthPeriod = (
  now: Date = new Date(),
): { from: Ymd; to: Ymd } => {
  const from = formatDateToYmd(new Date(now.getFullYear(), now.getMonth(), 1))
  const to = formatDateToYmd(now)

  return { from, to }
}

/**
 * Format "YYYY-MM" with Intl options.
 */
export const formatYmLabel = (
  ym: string,
  locale: Locale,
  options: Intl.DateTimeFormatOptions,
): string => {
  const date = parseYmToDate(ym)
  if (!date) return ''

  return getDtf(locale, options).format(date)
}

export const getAdjacentMonthLabels = (
  month: string,
  locale: Locale,
):
  | {
      prev: { long: string; short: string }
      next: { long: string; short: string }
    }
  | undefined => {
  const prev = addMonths(month, -1)
  const next = addMonths(month, 1)
  if (!prev || !next) return undefined

  const make = (v: string) => ({
    long: formatYmLabel(v, locale, { month: 'long' }),
    short: formatYmLabel(v, locale, { month: 'short' }),
  })

  return {
    prev: make(prev),
    next: make(next),
  }
}
