'use client'

import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react'
import {
  addMonths,
  formatYmLabel,
  getAdjacentMonthLabels,
  getCurrentYearMonth,
} from '@/lib/date'

const STROKE_WIDTH = 2.5

type MonthSelectProps = {
  value: string // "YYYY-MM"
  locale: string
  onChange: (newValue: string | undefined) => void
}

const MonthSelect = ({ value, locale, onChange }: MonthSelectProps) => {
  const currentYm = getCurrentYearMonth()
  const isNextDisabled = value >= currentYm

  const labels = getAdjacentMonthLabels(value, locale)
  const prev = labels?.prev
  const next = labels?.next

  return (
    <div className="w-full flex items-center justify-between gap-2">
      <button
        type="button"
        onClick={() => onChange(addMonths(value, -1))}
        className="font-bold flex items-center gap-2 p-2 text-sm text-gray-500 cursor-pointer"
      >
        <ArrowLeft strokeWidth={STROKE_WIDTH} className="h-4 w-4" />
        <span className="sm:hidden">{prev?.short}</span>
        <span className="hidden sm:inline">{prev?.long}</span>
      </button>

      <div className="flex items-center gap-2">
        <Calendar strokeWidth={STROKE_WIDTH} />
        <span className="text-lg font-bold">
          <span className="sm:hidden">
            {formatYmLabel(value, locale, { month: 'short' })}
          </span>
          <span className="hidden sm:inline">
            {formatYmLabel(value, locale, { month: 'long' })}
          </span>
        </span>
      </div>

      <button
        type="button"
        disabled={isNextDisabled}
        onClick={() => onChange(addMonths(value, 1))}
        className={`font-bold flex items-center gap-2 p-2 text-sm text-gray-500 ${isNextDisabled ? 'invisible' : 'cursor-pointer'}`}
      >
        <span className="sm:hidden">{next?.short}</span>
        <span className="hidden sm:inline">{next?.long}</span>
        <ArrowRight strokeWidth={STROKE_WIDTH} className="font-bold h-4 w-4" />
      </button>
    </div>
  )
}

export default MonthSelect
