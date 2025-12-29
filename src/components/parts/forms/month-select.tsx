'use client'

import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react'

const STROKE_WIDTH = 2.5

type MonthSelectProps = {
  value: string // "YYYY-MM"
  locale: string
  onChange: (newValue: string) => void // "YYYY-MM"
}

type MonthStyle = NonNullable<Intl.DateTimeFormatOptions['month']>

const toYearMonthDate = (value: string) => {
  const [y, m] = value.split('-').map(Number)
  return new Date(y, m - 1, 1)
}

const formatYearMonth = (
  value: string,
  locale: string,
  options: Intl.DateTimeFormatOptions,
) => {
  return new Intl.DateTimeFormat(locale, options).format(toYearMonthDate(value))
}

const toYearMonthLabel = (
  value: string,
  locale: string,
  monthStyle: MonthStyle = 'long',
) => {
  return formatYearMonth(value, locale, {
    year: 'numeric',
    month: monthStyle,
  })
}

const toMonthLabel = (
  value: string,
  locale: string,
  monthStyle: MonthStyle = 'long',
  options?: Omit<Intl.DateTimeFormatOptions, 'month'>,
) => {
  return formatYearMonth(value, locale, {
    // month表示もlongかshortか選べるようにする
    month: monthStyle,
    ...options,
  })
}

const shiftMonth = (value: string, delta: number) => {
  const [y, m] = value.split('-').map(Number)
  const d = new Date(y, m - 1 + delta, 1)
  const ny = d.getFullYear()
  const nm = String(d.getMonth() + 1).padStart(2, '0')
  return `${ny}-${nm}`
}

const getCurrentYearMonth = () => {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
}

const MonthSelect = ({ value, locale, onChange }: MonthSelectProps) => {
  const currentYm = getCurrentYearMonth()
  const isNextDisabled = value >= currentYm

  /**
   * 洗濯中の月から前後の月の名前を取得する関数
   */
  const getAdjacentMonthLabels = (
    month: string,
  ): {
    prevMonthLong: string
    prevMonthShort: string
    nextMonthLong: string
    nextMonthShort: string
  } => {
    const prevMonth = shiftMonth(month, -1)
    const nextMonth = shiftMonth(month, 1)
    return {
      prevMonthLong: toMonthLabel(prevMonth, locale, 'long'),
      prevMonthShort: toMonthLabel(prevMonth, locale, 'short'),
      nextMonthLong: toMonthLabel(nextMonth, locale, 'long'),
      nextMonthShort: toMonthLabel(nextMonth, locale, 'short'),
    }
  }
  const { prevMonthLong, prevMonthShort, nextMonthLong, nextMonthShort } =
    getAdjacentMonthLabels(value)

  return (
    <div className="w-full flex items-center justify-between gap-2">
      <button
        type="button"
        onClick={() => onChange(shiftMonth(value, -1))}
        className="font-bold flex items-center gap-2 p-2 text-sm text-gray-500 cursor-pointer"
      >
        <ArrowLeft strokeWidth={STROKE_WIDTH} className="h-4 w-4" />
        <span className="sm:hidden">{prevMonthShort}</span>
        <span className="hidden sm:inline">{prevMonthLong}</span>
      </button>

      <div className="flex items-center gap-2">
        <Calendar strokeWidth={STROKE_WIDTH} />
        <span className="text-lg font-bold">
          <span className="sm:hidden">{toYearMonthLabel(value, locale, 'short')}</span>
          <span className="hidden sm:inline">{toYearMonthLabel(value, locale, 'long')}</span>
        </span>
      </div>

      <button
        type="button"
        disabled={isNextDisabled}
        onClick={() => onChange(shiftMonth(value, 1))}
        className={`font-bold flex items-center gap-2 p-2 text-sm text-gray-500 ${isNextDisabled ? 'invisible' : 'cursor-pointer'}`}
      >
        <span className="sm:hidden">{nextMonthShort}</span>
        <span className="hidden sm:inline">{nextMonthLong}</span>
        <ArrowRight strokeWidth={STROKE_WIDTH} className="font-bold h-4 w-4" />
      </button>
    </div>
  )
}

export default MonthSelect
