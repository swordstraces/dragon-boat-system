import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Return a mock client if environment variables are missing
  if (!supabaseUrl || !supabaseKey) {
    console.warn('⚠️ CreateClient(Client): Supabase Env missing. Returning Mock.')
    
    const mockChain = {
      select: () => ({
        order: () => ({ data: [], error: null }),
        eq: () => ({
          single: () => ({ data: null, error: null }),
          data: [],
          error: null
        }),
        single: () => ({ data: null, error: null }),
        data: [],
        error: null
      }),
      insert: () => mockChain,
      update: () => mockChain,
      upsert: () => mockChain,
      delete: () => mockChain,
      then: (resolve: any) => resolve({ data: null, error: null }),
    }

    return {
      from: () => mockChain,
      auth: {
        getUser: async () => ({ data: { user: null } }),
      }
    } as any
  }

  return createBrowserClient(supabaseUrl, supabaseKey)
}
