import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import type { Locale } from '@/constants/locale'
import { localizePath, MENU_ITEMS } from '@/constants/page'
import { cn } from '@/lib/utils'

const AppSidebarContent = () => {
  const pathname = usePathname()
  const locale = useLocale() as Locale
  const t = useTranslations('Navigation')

  return (
    <SidebarContent className="bg-white">
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {MENU_ITEMS.map((item) => {
              const isActive = pathname === localizePath(locale, item.url)

              return (
                <SidebarMenuItem key={item.titleKey} className="mb-2">
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    className={cn(
                      'flex h-11 items-center gap-3 px-4',
                      'rounded-lg text-sm font-medium transition-colors',
                      'data-[active=true]:bg-emerald-50 data-[active=true]:text-emerald-700',
                      'hover:bg-emerald-50/60 hover:text-emerald-700/90',
                      'active:bg-emerald-50/60 active:text-emerald-700/90',
                    )}
                  >
                    <Link href={item.url} className="flex items-center gap-2">
                      <item.icon className="h-5 w-5 shrink-0" />
                      <span>{t(item.titleKey)}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  )
}

export default AppSidebarContent
