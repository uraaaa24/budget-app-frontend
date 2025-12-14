import { ClerkProvider } from '@clerk/nextjs'
import { Noto_Sans_JP } from 'next/font/google'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import Header from '@/components/layout/header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
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
            <SidebarProvider>
              <SidebarInset>
                <div className="bg-white min-h-screen">
                  <main className="flex-1 overflow-y-auto px-4">
                    <div className="max-w-5xl mx-auto w-full">
                      <Header />
                      {children}
                    </div>
                  </main>
                </div>
              </SidebarInset>
            </SidebarProvider>
          </NextIntlClientProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
