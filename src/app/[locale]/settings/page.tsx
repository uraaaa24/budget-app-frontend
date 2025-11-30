import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Settings - Budget App',
  description: 'Manage your settings with Budget App',
}

const SettingsPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Settings</h1>
      <p className="mt-2">This is the settings page.</p>
    </div>
  )
}

export default SettingsPage
