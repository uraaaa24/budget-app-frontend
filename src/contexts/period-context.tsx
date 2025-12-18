'use client'

import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react'
import { getThisMonthPeriod } from '@/lib/date'

type PeriodState = {
  from: string
  to: string
  setPeriod: (from: string, to: string) => void
}
const PeriodContext = createContext<PeriodState | undefined>(undefined)

export const PeriodProvider = ({ children }: { children: ReactNode }) => {
  const initialPeriod = useMemo(() => getThisMonthPeriod(), [])

  const [period, setPeriodState] = useState<{ from: string; to: string }>({
    from: initialPeriod.from,
    to: initialPeriod.to,
  })
  const setPeriod = (from: string, to: string) => {
    setPeriodState({ from, to })
  }

  const value = {
    from: period.from,
    to: period.to,
    setPeriod,
  }

  return <PeriodContext value={value}>{children}</PeriodContext>
}

export const usePeriod = () => {
  const ctx = useContext(PeriodContext)
  if (!ctx) {
    throw new Error('usePeriod must be used within a PeriodProvider')
  }
  return ctx
}
