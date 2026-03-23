import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.warn('⚠️ Client: Missing Supabase Env. Returning dummy client.')
    return {
      auth: {
        getUser: async () => ({ data: { user: { email: 'coach@dragonboat.com' } } }),
      }
    } as any
  }
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
