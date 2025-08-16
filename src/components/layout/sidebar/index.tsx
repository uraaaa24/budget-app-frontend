'use client'

import { Sidebar } from '@/components/ui/sidebar'
import AppSidebarContent from './sidebar-content'
import AppSidebarHeader from './sidebar-header'

/**
 * AppSidebar component that renders the sidebar layout.
 */
const AppSidebar = () => {
  return (
    <Sidebar className="p-6">
      <AppSidebarHeader />
      <AppSidebarContent />
    </Sidebar>
  )
}

export default AppSidebar
