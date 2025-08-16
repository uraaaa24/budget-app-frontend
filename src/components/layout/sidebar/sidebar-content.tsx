import {
  Calendar,
  Home,
  Inbox,
  PiggyBank,
  Search,
  Settings,
} from 'lucide-react'
import Link from 'next/link'
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { HOME_PAGE, SETTINGS_PAGE, TRANSACTIONS_PAGE } from '@/constants/page'

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
]

const AppSidebarContent = () => {
  return (
    <SidebarContent className="bg-white">
      <SidebarGroup>
        <SidebarGroupLabel>Menu</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.url} className="flex items-center gap-2">
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  )
}

export default AppSidebarContent
