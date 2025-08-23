'use client'

import { useAuth } from '@clerk/nextjs'
import { useCallback } from 'react'
import { env } from '@/config/env'

/**
 * Generic fetcher function for SWR
 */
const fetcher = async <T>(...args: Parameters<typeof fetch>): Promise<T> => {
  const res = await fetch(...args)

  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)

  return res.json() as Promise<T>
}

/**
 * Custom hook to use fetcher functions with Clerk authentication
 */
export const useFetcher = () => {
  const { getToken } = useAuth()

  /**
   * Fetcher function for authenticated requests
   */
  const authFetcher = useCallback(
    async <T>(...args: Parameters<typeof fetch>): Promise<T> => {
      const [url, init = {}] = args
      const token = await getToken({ template: env.CLERK_JWT_TEMPLATE_NAME })

      return fetcher<T>(url, {
        ...init,
        headers: {
          ...init.headers,
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
    },
    [getToken],
  )

  return { fetcher, authFetcher }
}
