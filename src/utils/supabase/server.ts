import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
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
    }
  )
}

/**
 * Helper to get the currently selected member from cookie.
 * No longer uses Supabase Auth.
 */
export async function getSelectedMember() {
  const cookieStore = await cookies()
  const memberId = cookieStore.get('member_id')?.value

  if (!memberId) return null

  const supabase = await createClient()
  
  // If no env vars, return mock user
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return { id: memberId, full_name: '队员' + memberId, role: memberId === '1' ? 'coach' : 'member' }
  }

  const { data: member } = await supabase
    .from('members')
    .select('*')
    .eq('id', memberId)
    .single()

  return member
}
