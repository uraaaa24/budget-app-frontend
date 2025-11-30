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

  if (value instanceof Date) {
    return new Date(value.getFullYear(), value.getMonth(), value.getDate())
  }

  if (typeof value === 'string') {
    const [y, m, d] = value.split('-').map(Number)
    if (!y || !m || !d) return undefined
    return new Date(y, m - 1, d)
  }

  return undefined
}

/**
 * Format a date value (string in "YYYY-MM-DD" format or Date object) for display in "ja-JP" locale.
 *
 * @param value
 * @returns
 */
export const formatForDisplay = (
  value: string | Date | null | undefined,
): string => {
  if (!value) return ''

  const date =
    value instanceof Date ? value : (parseYmdToDate(value) ?? undefined)

  if (!date) return ''

  return date.toLocaleDateString('ja-JP')
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
 * Format a Date into YYYY-MM-DD (local time, no timezone shift).
 *
 * @param date - The Date to format.
 * @returns The formatted date string in YYYY-MM-DD format.
 */
const formatDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Get the period for the current month in YYYY-MM-DD format.
 */
export const getThisMonthPeriod = (): { from: string; to: string } => {
  const today = new Date()
  const from = formatDate(new Date(today.getFullYear(), today.getMonth(), 1))
  const to = formatDate(today)
  return { from, to }
}
