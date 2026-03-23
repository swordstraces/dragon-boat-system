import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // If environment variables are missing, return a Mock Supabase Client
  if (!supabaseUrl || !supabaseKey) {
    console.warn('⚠️ CreateClient: Supabase Env missing. Bypassing with Mock Client.')
    
    // helper to create a mock chainable object
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
      eq: () => ({
        select: () => ({
          single: () => ({ data: null, error: null }),
        }),
        single: () => ({ data: null, error: null }),
        error: null
      }),
      insert: () => mockChain, // Allow chaining after insert
      update: () => mockChain, // Allow chaining after update
      upsert: () => mockChain, // Allow chaining after upsert
      delete: () => mockChain, // Allow chaining after delete
      single: () => ({ data: null, error: null }),
      then: (resolve: any) => resolve({ data: null, error: null }), // Make it awaitable
    }

    return {
      from: () => mockChain,
      auth: {
        getUser: async () => ({ data: { user: null }, error: null }),
        getSession: async () => ({ data: { session: null }, error: null }),
      }
    } as any
  }

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {
          // The `setAll` method was called from a Server Component.
        }
      },
    },
  })
}

export async function getSelectedMember() {
  const cookieStore = await cookies()
  const memberId = cookieStore.get('member_id')?.value

  if (!memberId) return null

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    // If it's a numeric ID (original mock) or a timestamp (new mock), we return a dummy name
    // If it's a name we've "stored" in the cookie, we try to use that.
    return { 
      id: memberId, 
      full_name: isNaN(Number(memberId)) ? memberId : '队员' + memberId, 
      role: memberId === '1' ? 'coach' : 'member' 
    }
  }

  const supabase = await createClient()
  const { data: member } = await supabase
    .from('members')
    .select('*')
    .eq('id', memberId)
    .single()

  return member
}
