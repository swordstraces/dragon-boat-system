import Link from 'next/link'
import { getSelectedMember, createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { submitRSVP } from '@/app/actions'

export default async function TrainingDetail({ params }: { params: Promise<{ id: string }> }) {
  const member = await getSelectedMember()
  const { id } = await params
  const trainingId = parseInt(id)

  if (!member) {
    redirect('/login')
  }

  const supabase = await createClient()

  // 1. Fetch training
  let training: any = null
  try {
    const { data } = await supabase.from('trainings').select('*').eq('id', trainingId).single()
    training = data
  } catch (e) {}

  if (!training) {
    training = { id: trainingId, title: '周末淀山湖水上20km合练', date: '2026-06-15', time: '07:00 - 10:00', type: 'water', location: '上海淀山湖基地', description: '高强度水上拉练' }
  }

  // 2. Fetch RSVPs and Participant count
  let rsvps: any[] = []
  try {
    const { data } = await supabase.from('rsvps').select('*, members(full_name, role)').eq('training_id', trainingId)
    rsvps = data || []
  } catch (e) {}

  // 3. Current member's RSVP status
  const myRsvp = rsvps.find(r => String(r.member_id) === String(member.id))

  // Local Actions Wrapper for client side interaction (if we want, but keeping it simple with direct actions)
  async function joinTraining() {
    'use server'
    await submitRSVP(trainingId, 'attending')
  }

  async function leaveTraining() {
    'use server'
    await submitRSVP(trainingId, 'leave')
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans pb-24">
      <div className="relative h-64 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-emerald-900 opacity-60"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent"></div>
        <div className="absolute top-16 left-6 z-10">
           <Link href="/trainings" className="h-10 w-10 rounded-2xl bg-black/40 backdrop-blur-md flex items-center justify-center text-white border border-white/10 active:scale-95 transition-all">
             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
           </Link>
        </div>
      </div>

      <main className="px-6 -mt-16 relative z-10 space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
              {training.type === 'water' ? '水上拉练' : '体能强化'}
            </span>
            <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">ID: {trainingId}</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight">{training.title}</h1>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-[2.5rem] p-6 space-y-4">
           <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-neutral-800 flex items-center justify-center text-emerald-500">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <p className="font-bold text-sm">{training.date}</p>
                <p className="text-[10px] uppercase font-bold text-neutral-500">{training.time}</p>
              </div>
           </div>
           <div className="flex items-center gap-4 pt-4 border-t border-neutral-800/50">
              <div className="h-10 w-10 rounded-xl bg-neutral-800 flex items-center justify-center text-blue-500">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <p className="font-bold text-xs text-neutral-400">{training.location}</p>
           </div>
        </div>

        {/* RSVP Interaction */}
        <div className="space-y-4">
           <h3 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-500 px-2">我的状态</h3>
           <div className="flex gap-3">
              <form action={joinTraining} className="flex-1">
                 <button className={`w-full py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] transition-all active:scale-95 ${myRsvp?.status === 'attending' ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/20' : 'bg-neutral-900 text-neutral-500 border border-neutral-800'}`}>
                    确认报名
                 </button>
              </form>
              <form action={leaveTraining} className="flex-1">
                 <button className={`w-full py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] transition-all active:scale-95 ${myRsvp?.status === 'leave' ? 'bg-red-500 text-white shadow-xl shadow-red-500/20' : 'bg-neutral-900 text-neutral-500 border border-neutral-800'}`}>
                    请假不来
                 </button>
              </form>
           </div>
           {myRsvp && (
             <p className="text-center text-[10px] font-black uppercase tracking-widest text-emerald-400">已提交数据并实时入库 ✓</p>
           )}
        </div>

        {/* Attendance List */}
        <section className="space-y-4">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-500 px-2">成员名单 ({rsvps.filter(r => r.status === 'attending').length})</h2>
          <div className="bg-neutral-900 rounded-[2.5rem] border border-neutral-800 overflow-hidden divide-y divide-neutral-800/50">
            {rsvps.length > 0 ? (
              rsvps.map((p, i) => (
                <div key={i} className="flex justify-between items-center p-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-neutral-800 flex items-center justify-center font-black text-sm text-emerald-500">
                      {p.members?.full_name?.charAt(0) || '👤'}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">{p.members?.full_name}</h4>
                      <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest">{p.status === 'attending' ? '请战参加' : '暂时请假'}</p>
                    </div>
                  </div>
                  {p.status === 'attending' ? (
                     <div className="h-6 w-6 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                     </div>
                  ) : (
                     <div className="h-6 w-6 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                     </div>
                  )}
                </div>
              ))
            ) : (
              <div className="p-10 text-center text-neutral-600 font-bold italic text-sm">暂无成员报名，点击上方按钮开启打头阵！</div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
