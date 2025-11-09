import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { MENU_ITEMS } from '@/constants/page'
import { cn } from '@/lib/utils'

const AppSidebarContent = () => {
  const pathname = usePathname()
  const t = useTranslations('Navigation')

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {MENU_ITEMS.map((item) => {
              const isActive =
                pathname === item.url || pathname.startsWith(item.url + '/')

              return (
                <SidebarMenuItem key={item.titleKey} className="mb-1">
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    className={cn(
                      'flex h-12 items-center gap-3 px-4',
                      'rounded-lg text-base font-medium transition-colors',
                      'data-[active=true]:bg-green-200/80 data-[active=true]:text-green-700',
                      'hover:bg-green-100/80 hover:text-green-700/90',
                      'active:bg-green-100/80 active:text-green-700/90',
                    )}
                  >
                    <Link href={item.url} className="flex items-center gap-2">
                      <item.icon className="h-8 w-8 shrink-0" />
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
