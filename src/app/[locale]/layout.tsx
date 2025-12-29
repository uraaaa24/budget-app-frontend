import { ClerkProvider } from '@clerk/nextjs'
import { Noto_Sans_JP } from 'next/font/google'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import Header from '@/components/layout/header'
import MobileBottomNav from '@/components/layout/mobile-bottom-nav'
import TransactionPeriodSelect from '@/components/layout/month-select'
import { PeriodProvider } from '@/contexts/period-context'
import { routing } from '@/i18n/routing'

const notoSans = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans',
})

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()

  return (
    <ClerkProvider>
      <html lang={locale}>
        <body className={`${notoSans.className} antialiased`}>
          <NextIntlClientProvider>
            <PeriodProvider>
              <InternalLocaleLayout>{children}</InternalLocaleLayout>
            </PeriodProvider>
          </NextIntlClientProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}

const InternalLocaleLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="flex-1 overflow-y-auto bg-white min-h-screen">
        <div className="mx-auto w-full min-h-screen flex flex-col">
          <div className="max-w-5xl w-full mx-auto mb-4 p-4">
            <Header />
            <div className="w-sm mt-4 mx-auto">
              <TransactionPeriodSelect />
            </div>
          </div>

          <div className="bg-gray-50 flex-1 pt-6 pb-24 px-4 sm:pb-6">
            <div className="max-w-5xl mx-auto">{children}</div>
          </div>
        </div>
      </main>

      <MobileBottomNav />
    </>
  )
}
