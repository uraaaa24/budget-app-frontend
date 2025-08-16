import { ClerkProvider } from '@clerk/nextjs'
import { Noto_Sans_JP } from 'next/font/google'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import Header from '@/components/layout/header'
import AppSidebar from '@/components/layout/sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { routing } from '@/i18n/routing'

const notoSansJP = Noto_Sans_JP({
  variable: '--font-noto-sans-jp',
  subsets: ['latin'],
  display: 'swap',
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
        <body className={`${notoSansJP.variable} antialiased`}>
          <NextIntlClientProvider>
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset>
                <Header />
                <main className="flex-1 overflow-y-auto px-10">{children}</main>
              </SidebarInset>
            </SidebarProvider>
          </NextIntlClientProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
