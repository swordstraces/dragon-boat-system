import Link from 'next/link'
import { getSelectedMember, createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function TrainingDetail({ params }: { params: Promise<{ id: string }> }) {
  const member = await getSelectedMember()
  const { id } = await params

  if (!member) {
    redirect('/login')
  }

  const supabase = await createClient()

  // Try fetching real training data
  let training: any = null
  try {
    const { data } = await supabase.from('trainings').select('*').eq('id', id).single()
    training = data
  } catch (e) {}

  // Mock if not found
  if (!training) {
    training = {
      id: id, 
      title: '周末淀山湖水上20km合练', 
      date: '2026-06-15', 
      time: '07:00 - 10:00', 
      type: 'water', 
      location: '上海青浦区淀山湖水上运动中心',
      description: '本次合练主要针对下场正式比赛的同步率进行测试。',
    }
  }

  // Fetch RSVPs
  let rsvps: any[] = []
  try {
    const { data } = await supabase.from('rsvps').select('*, members(full_name, role)').eq('training_id', id)
    rsvps = data || []
  } catch (e) {}

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans pb-24">
      {/* Header with Background */}
      <div className="relative h-72 w-full bg-neutral-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/40 to-blue-900/80 z-0"></div>
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent z-0"></div>
        <div className="absolute top-16 left-6 right-6 z-10 flex justify-between items-center">
          <Link href="/trainings" className="h-10 w-10 rounded-2xl bg-black/40 backdrop-blur-md flex items-center justify-center text-white border border-white/10 active:scale-95 transition-all">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </Link>
          <span className="px-4 py-1.5 rounded-full bg-emerald-500/20 backdrop-blur-md text-[10px] font-black uppercase tracking-widest border border-emerald-500/30 text-emerald-400">
            {training.type === 'water' ? '水上合练' : '技术交流'}
          </span>
        </div>
      </div>

      <main className="px-6 -mt-24 relative z-10 space-y-8">
        {/* Title and Info */}
        <div className="space-y-6">
          <h1 className="text-4xl font-black leading-tight tracking-tight">{training.title}</h1>
          
          <div className="grid gap-3 p-1 bg-neutral-900/50 backdrop-blur-md rounded-[2.5rem] border border-neutral-800">
            <div className="flex items-center gap-4 p-5">
              <div className="h-12 w-12 rounded-2xl bg-neutral-800 flex items-center justify-center text-emerald-400 border border-neutral-700">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <p className="text-lg font-black">{training.date}</p>
                <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest">{training.time}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-5 border-t border-neutral-800/50">
              <div className="h-12 w-12 rounded-2xl bg-neutral-800 flex items-center justify-center text-blue-400 border border-neutral-700">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold leading-snug">{training.location}</p>
                <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-blue-500 mt-1 inline-block">Open in Maps &rarr;</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Action Panel */}
        <div className="p-1.5 bg-neutral-900 rounded-[2rem] border border-neutral-800">
          <div className="flex gap-1">
            <button className="flex-1 py-4 px-2 text-center rounded-2xl bg-emerald-500 font-black text-xs uppercase tracking-widest text-white shadow-xl shadow-emerald-500/20 active:scale-95 transition-all">请战参与</button>
            <button className="flex-1 py-4 px-2 text-center rounded-2xl text-neutral-500 font-black text-xs uppercase tracking-widest hover:text-white hover:bg-neutral-800 transition-all active:scale-95">请假/缺席</button>
          </div>
        </div>

        {/* Outline / Description */}
        <section className="space-y-3">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-500 px-2">训练大纲</h2>
          <div className="bg-neutral-900 p-6 rounded-[2rem] border border-neutral-800">
             <p className="text-sm text-neutral-400 leading-relaxed font-medium italic">"{training.description}"</p>
          </div>
        </section>

        {/* RSVP List */}
        <section className="space-y-4">
          <div className="flex justify-between items-end px-2">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-500">已报名成员 ({rsvps.length})</h2>
            <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-blue-500">排练席位图</Link>
          </div>
          
          <div className="bg-neutral-900 rounded-[2.5rem] border border-neutral-800 overflow-hidden divide-y divide-neutral-800/50">
            {rsvps.length > 0 ? (
              rsvps.map((p, i) => (
                <div key={i} className="flex justify-between items-center p-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-neutral-800 flex items-center justify-center font-black text-sm text-blue-400 border border-neutral-700">
                      {p.members.full_name?.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">{p.members.full_name}</h4>
                      <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest">{p.role || '划手'}</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-[0.15em] px-2 py-1 rounded bg-black/40 text-emerald-400 border border-emerald-400/20">已报名</span>
                </div>
              ))
            ) : (
              <div className="p-10 text-center text-neutral-600 font-bold italic text-sm">暂无成员报名</div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
