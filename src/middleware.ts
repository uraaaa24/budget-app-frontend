import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware()

export const config = {
  matcher: [
    // Always run for API routes
    '/(api|trpc)(.*)',

    // Match all paths except:
    //  - Next.js internals (`/_next`), Vercel internals (`/_vercel`)
    //  - static files with an extension (e.g. /favicon.ico, /file.json)
    '/((?!.+\\.[\\w]+$|_next|_vercel).*)',
    '/',
  ],
}
