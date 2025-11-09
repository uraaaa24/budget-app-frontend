'use client'

import { Sidebar } from '@/components/ui/sidebar'
import AppSidebarContent from './sidebar-content'
import AppSidebarHeader from './sidebar-header'

/**
 * AppSidebar component that renders the sidebar layout.
 */
const AppSidebar = () => {
  return (
    <Sidebar>
      <div className="p-6 bg-green-50/50 h-full flex flex-col">
        <AppSidebarHeader />
        <AppSidebarContent />
      </div>
    </Sidebar>
  )
}

export default AppSidebar
