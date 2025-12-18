'use client'

import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react'

const STROKE_WIDTH = 2.5

type MonthSelectProps = {
  value: string // "YYYY-MM"
  locale: string
  onChange: (newValue: string) => void // "YYYY-MM"
}

const toYearMonthLabel = (value: string, locale: string) => {
  const [y, m] = value.split('-').map(Number)
  const d = new Date(y, m - 1, 1)
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
  }).format(d)
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

  return (
    <div className="w-full flex items-center justify-between gap-2">
      <button
        type="button"
        onClick={() => onChange(shiftMonth(value, -1))}
        className="font-bold  flex items-center gap-2 text-sm text-gray-500 cursor-pointer"
      >
        <ArrowLeft strokeWidth={STROKE_WIDTH} className="h-4 w-4" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      <div className="flex items-center gap-2">
        <Calendar strokeWidth={STROKE_WIDTH} />
        <span className="text-lg font-bold">
          {toYearMonthLabel(value, locale)}
        </span>
      </div>

      <button
        type="button"
        disabled={isNextDisabled}
        onClick={() => onChange(shiftMonth(value, 1))}
        className={`font-bold flex items-center gap-2 p-2 text-sm text-gray-500 ${isNextDisabled ? 'invisible' : 'cursor-pointer'}`}
      >
        <span className="hidden sm:inline">Next</span>
        <ArrowRight strokeWidth={STROKE_WIDTH} className="font-bold h-4 w-4" />
      </button>
    </div>
  )
}

export default MonthSelect
