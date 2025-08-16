import { Home, PiggyBank, Settings } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import type { Locale } from '@/constants/locale'
import {
  HOME_PAGE,
  localizePath,
  SETTINGS_PAGE,
  TRANSACTIONS_PAGE,
} from '@/constants/page'
import { cn } from '@/lib/utils'

// Menu items.
const items = [
  {
    title: 'Dashboard',
    url: HOME_PAGE,
    icon: Home,
  },
  {
    title: 'Transactions',
    url: TRANSACTIONS_PAGE,
    icon: PiggyBank,
  },
  {
    title: 'Settings',
    url: SETTINGS_PAGE,
    icon: Settings,
  },
] as const

const AppSidebarContent = () => {
  const pathname = usePathname()
  const locale = useLocale() as Locale

  return (
    <SidebarContent className="bg-white">
      <SidebarGroup>
        {/* <SidebarGroupLabel>Menu</SidebarGroupLabel> */}
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => {
              const isActive = pathname === localizePath(locale, item.url)

              return (
                <SidebarMenuItem key={item.title} className="mb-2">
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
                      <span>{item.title}</span>
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
