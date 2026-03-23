import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // If environment variables are missing, return a Mock Supabase Client
  // This prevents crashes during local development or on Vercel without env vars.
  if (!supabaseUrl || !supabaseKey) {
    console.warn('⚠️ CreateClient: Supabase Env missing. Bypassing with Mock Client.')
    return {
      from: (table: string) => ({
        select: () => ({
          order: () => ({ data: [], error: null }),
          eq: () => ({
            single: () => ({ data: null, error: null }),
            data: [],
            error: null
          }),
        }),
        insert: () => ({ error: null }),
        update: () => ({ eq: () => ({ error: null }) }),
        delete: () => ({ eq: () => ({ error: null }) }),
      }),
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

/**
 * Helper to get the currently selected member from cookie.
 * No longer uses Supabase Auth.
 */
export async function getSelectedMember() {
  const cookieStore = await cookies()
  const memberId = cookieStore.get('member_id')?.value

  if (!memberId) return null

  // If no env vars, return mock user directly
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const mockNames: Record<string, string> = {
      '1': '队长李雷', '2': '韩梅梅', '3': '张伟', '4': '王大锤', '5': '刘备', '6': '关羽'
    }
    return { 
      id: memberId, 
      full_name: mockNames[memberId] || '队员' + memberId, 
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
