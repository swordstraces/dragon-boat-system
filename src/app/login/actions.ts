'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function enterSystem(formData: FormData) {
  const name = formData.get('name') as string
  if (!name || name.trim() === '') return

  const cookieStore = await cookies()
  const supabase = await createClient()

  // 1. Check if member exists
  const { data: existingMember } = await supabase
    .from('members')
    .select('id')
    .eq('full_name', name.trim())
    .single()

  let memberIdValue: string

  if (existingMember) {
    memberIdValue = String(existingMember.id)
  } else {
    // 2. Create new member if not exists
    const { data: newMember, error } = await supabase
      .from('members')
      .insert({ full_name: name.trim(), role: 'member' })
      .select('id')
      .single()
    
    // If Supabase is in mock mode (error or no return), we use the name itself as the ID
    memberIdValue = newMember ? String(newMember.id) : name.trim()
  }

  cookieStore.set('member_id', memberIdValue, {
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: '/',
  })
  
  redirect('/')
}

export async function signout() {
  const cookieStore = await cookies()
  cookieStore.delete('member_id')
  redirect('/login')
}
