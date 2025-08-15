import { defineRouting } from 'next-intl/routing'
import { defaultLocale, locales } from '@/constants/locale'

export const routing = defineRouting({ locales, defaultLocale })
