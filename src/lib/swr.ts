/**
 * Generic fetcher function for SWR
 */
export const fetcher = async <T>(
  ...args: Parameters<typeof fetch>
): Promise<T> => {
  const res = await fetch(...args)

  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)

  return res.json() as Promise<T>
}
