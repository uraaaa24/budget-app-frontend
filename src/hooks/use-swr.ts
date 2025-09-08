'use client'

import { useAuth } from '@clerk/nextjs'
import { useCallback } from 'react'
import useSWRMutation from 'swr/mutation'
import { env } from '@/config/env'
import type { CrudMethod } from '@/constants/api'

/**
 * Generic fetcher function for SWR
 */
const fetcher = async <T>(...args: Parameters<typeof fetch>): Promise<T> => {
  const res = await fetch(...args)

  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)

  if (res.status === 204) return {} as T

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

/**
 * Custom hook for performing mutations (POST, PUT, DELETE) with SWR
 */
export const useMutation = <TRequest, TResponse>(
  url: string,
  method: Exclude<CrudMethod, 'GET'>,
) => {
  const { authFetcher } = useFetcher()

  return useSWRMutation(
    url,
    async (url: string, { arg }: { arg: TRequest }) => {
      return authFetcher<TResponse>(url, {
        method,
        body: JSON.stringify(arg),
      })
    },
  )
}
