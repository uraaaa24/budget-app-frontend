import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/nextjs'
import { Noto_Sans_JP } from 'next/font/google'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import AppSidebar from '@/components/layout/header'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
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
                <header className="flex h-16 shrink-0 items-center gap-2 px-4">
                  <SidebarTrigger />
                  <SignedOut>
                    <SignInButton />
                    <SignUpButton>
                      <button
                        type="button"
                        className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer"
                      >
                        Sign Up
                      </button>
                    </SignUpButton>
                  </SignedOut>
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                </header>

                <main>{children}</main>
              </SidebarInset>
            </SidebarProvider>
          </NextIntlClientProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
