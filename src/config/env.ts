import * as z from 'zod'

/**
 * Create and validate env variables using zod
 */
const createEnv = () => {
  const EnvSchema = z.object({
    API_URL: z.string(),
    CLERK_JWT_TEMPLATE_NAME: z.string(),
    CLERK_PUBLISHABLE_KEY: z.string(),
  })

  const envVars = {
    API_URL: process.env.NEXT_PUBLIC_API_URL,
    CLERK_JWT_TEMPLATE_NAME: process.env.NEXT_PUBLIC_CLERK_JWT_TEMPLATE_NAME,
    CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  }

  const parsedEnv = EnvSchema.safeParse(envVars)

  if (!parsedEnv.success) {
    throw new Error(
      `Invalid env provided.
  The following variables are missing or invalid:
  ${Object.entries(parsedEnv.error.flatten().fieldErrors)
    .map(([k, v]) => `- ${k}: ${v}`)
    .join('\n')}
  `,
    )
  }

  return parsedEnv.data ?? {}
}

/**
 * Validated env variables
 */
export const env = createEnv()
