'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function selectMember(formData: FormData) {
  const memberId = formData.get('memberId') as string
  const cookieStore = await cookies()

  if (memberId) {
    cookieStore.set('member_id', memberId, {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: '/',
    })
    redirect('/')
  }
}

export async function signout() {
  const cookieStore = await cookies()
  cookieStore.delete('member_id')
  redirect('/login')
}
