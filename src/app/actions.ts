'use server'

import { createClient, getSelectedMember } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function submitRSVP(trainingId: number, status: 'attending' | 'leave') {
  const member = await getSelectedMember()
  if (!member) return { error: '未登录' }

  const supabase = await createClient()
  
  // Use upsert to handle updates if they change their mind
  const { error } = await supabase
    .from('rsvps')
    .upsert({
      training_id: trainingId,
      member_id: member.id,
      status: status,
    }, { onConflict: 'training_id, member_id' })

  if (error) {
    console.error('RSVP Error:', error)
    return { error: '提交失败，请重试' }
  }

  revalidatePath(`/trainings/${trainingId}`)
  return { success: true }
}

export async function submitCheckIn(formData: FormData) {
  const member = await getSelectedMember()
  if (!member) return { error: '未登录' }

  const type = formData.get('type') as string
  const notes = formData.get('notes') as string
  // For now, we don't handle real file uploads unless Supabase Storage is set up.
  // We'll just store a placeholder or ignore for this mock-enabled version.

  const supabase = await createClient()

  const { error } = await supabase
    .from('checkins')
    .insert({
      member_id: member.id,
      type: type,
      notes: notes,
    })

  if (error) {
    console.error('Check-in Error:', error)
    return { error: '打卡失败' }
  }

  revalidatePath('/checkin')
  revalidatePath('/')
  return { success: true }
}
