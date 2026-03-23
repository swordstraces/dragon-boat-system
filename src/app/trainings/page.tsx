import Link from 'next/link'
import { getSelectedMember, createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function TrainingsPage() {
  const member = await getSelectedMember()

  if (!member) {
    redirect('/login')
  }

  const supabase = await createClient()
  
  // Try to fetch real trainings from DB
  let upcomingTrainings = []
  try {
    const { data } = await supabase.from('trainings').select('*').order('date', { ascending: true })
    if (data && data.length > 0) upcomingTrainings = data
  } catch (e) {}

  // Mock data if DB empty
  if (upcomingTrainings.length === 0) {
    upcomingTrainings = [
      { id: 1, title: '周末淀山湖水上20km合练', date: '2026-06-15', time: '07:00 - 10:00', type: 'water' },
      { id: 2, title: '周间力量核心房', date: '2026-06-18', time: '19:00 - 20:30', type: 'gym' },
    ]
  }

  const getTypeStyle = (type: string) => {
    switch (type) {
      case 'water': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
      case 'gym': return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
      case 'race': return 'bg-red-500/10 text-red-400 border-red-500/20'
      default: return 'bg-neutral-800 text-neutral-400 border-neutral-700'
    }
  }

  const getTypeText = (type: string) => {
    switch (type) {
      case 'water': return '水上训练'
      case 'gym': return '体能/陆地'
      case 'race': return '正式大项'
      default: return '技术交流'
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white pb-24 font-sans">
      <header className="px-6 pt-16 pb-8 sticky top-0 z-10 bg-neutral-950/80 backdrop-blur-md">
        <h1 className="text-3xl font-black mb-1">训练月历</h1>
        <p className="text-neutral-500 text-sm font-medium tracking-tight">查收本月安排并确认报名状态</p>
      </header>

      <main className="px-6 space-y-6">
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-none">
          {['全部日程', '水上', '陆地', '赛事'].map((tab, i) => (
            <button key={tab} className={`shrink-0 px-5 py-2 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${i === 0 ? 'bg-white text-black shadow-lg shadow-white/10' : 'bg-neutral-900 text-neutral-500 border border-neutral-800'}`}>
              {tab}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {upcomingTrainings.map((t) => (
            <Link key={t.id} href={`/trainings/${t.id}`} className="block group">
              <div className="rounded-[2rem] bg-neutral-900 border border-neutral-800 p-6 active:scale-[0.98] transition-all hover:bg-neutral-800/80 hover:border-neutral-700">
                <div className="flex justify-between items-start mb-5">
                  <div className="space-y-2">
                    <span className={`inline-block px-3 py-1 rounded-lg border text-[9px] font-black uppercase tracking-[0.15em] ${getTypeStyle(t.type)}`}>
                      {getTypeText(t.type)}
                    </span>
                    <h3 className="text-xl font-bold text-white leading-tight">{t.title}</h3>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4 text-xs text-neutral-500 font-bold mb-5 italic">
                  <div className="flex items-center gap-2">
                    <span className="text-neutral-700">DATE</span>
                    <span className="text-neutral-300">{t.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-neutral-700">TIME</span>
                    <span className="text-neutral-300">{t.time}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-5 border-t border-neutral-800/50">
                   <div className="flex -space-x-2">
                      {[1, 2, 3].map((num) => (
                        <div key={num} className="w-7 h-7 rounded-full bg-neutral-800 border-2 border-neutral-900 flex items-center justify-center text-[10px] font-bold">👤</div>
                      ))}
                      <div className="w-7 h-7 rounded-full bg-neutral-950 border-2 border-neutral-900 flex items-center justify-center text-[8px] font-black text-neutral-600">+12</div>
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-xl border border-emerald-400/20">
                     立即详情报名
                   </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 w-full bg-neutral-950/90 backdrop-blur-xl border-t border-neutral-900 pb-8 pt-2 px-6 flex justify-between items-center text-xs font-medium text-neutral-500 z-50">
        <Link href="/" className="flex flex-col items-center gap-1 p-2 hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
          首页
        </Link>
        <Link href="/trainings" className="flex flex-col items-center gap-1 p-2 text-white">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          计划
        </Link>
        <Link href="/leaderboard" className="flex flex-col items-center gap-1 p-2 hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
          排行榜
        </Link>
        <Link href="/profile" className="flex flex-col items-center gap-1 p-2 hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          我的
        </Link>
      </nav>
    </div>
  )
}
