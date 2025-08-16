import { Leaf } from 'lucide-react'
import Link from 'next/link'
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

const AppSidebarHeader = () => {
  return (
    <SidebarHeader className="bg-white pb-2">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            className="hover:bg-transparent active:bg-transparent"
          >
            <Link href="/" className="flex items-center gap-4">
              <Leaf className="!size-6 text-green-600" />
              <span className="text-xl font-semibold">Budget App</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  )
}

export default AppSidebarHeader
