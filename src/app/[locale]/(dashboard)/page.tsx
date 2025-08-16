import { auth } from '@clerk/nextjs/server'
import { getTranslations } from 'next-intl/server'

export default async function HomePage() {
  const { userId } = await auth()

  const t = await getTranslations('HomePage')

  return (
    <>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
      <p>hello, {userId}</p>
    </>
  )
}
