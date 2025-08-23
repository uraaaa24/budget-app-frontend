import { auth } from '@clerk/nextjs/server'
import { cache } from 'react'
import { env } from '@/config/env'

/**
 * Base API client for server-side requests
 */
export const apiClient = async <T>(
  ...args: Parameters<typeof fetch>
): Promise<T> => {
  const res = await fetch(...args)

  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)

  return res.json() as Promise<T>
}

/**
 * Cached function to get Clerk JWT token
 */
const getClerkToken = cache(async () => {
  const { getToken } = await auth()
  return getToken({ template: env.CLERK_JWT_TEMPLATE_NAME })
})

/**
 * Authenticated API client for server-side requests.
 * Uses Clerk JWT token for authentication.
 */
export const authApiClient = async <T>(
  ...args: Parameters<typeof fetch>
): Promise<T> => {
  const [url, init = {}] = args
  const token = await getClerkToken()

  const hasBody = init.body != null
  const isFormData =
    typeof FormData !== 'undefined' && init.body instanceof FormData

  const headers = {
    ...(init.headers ?? {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(hasBody && !isFormData ? { 'Content-Type': 'application/json' } : {}),
  }

  return apiClient<T>(url, { ...init, headers })
}
