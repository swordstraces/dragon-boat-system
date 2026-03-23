import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function TrainingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Mock data for display purposes
  const upcomingTrainings = [
    { id: 1, title: '周末淀山湖水上20km合练', date: '6月15日 周六', time: '07:00 - 10:00', type: '水上', typeColor: 'emerald', RSVPs: 14 },
    { id: 2, title: '周间力量核心房', date: '6月18日 周二', time: '19:00 - 20:30', type: '陆地/体能', typeColor: 'blue', RSVPs: 8 },
    { id: 3, title: '测水池姿势纠正', date: '6月20日 周四', time: '19:00 - 21:00', type: '技术', typeColor: 'purple', RSVPs: 12 },
  ]

  return (
    <div className="min-h-screen bg-neutral-950 text-white pb-24 font-sans">
      <header className="px-6 pt-12 pb-6 sticky top-0 z-10 bg-neutral-950/80 backdrop-blur-md">
        <h1 className="text-2xl font-bold">训练安排</h1>
        <p className="text-neutral-400 text-sm mt-1">查看所有训练与赛事并进行 RSVP报名</p>
      </header>

      <main className="px-6 space-y-6">
        {/* Month Selector or Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {['全部', '水上', '陆地', '赛事'].map((tab, i) => (
            <button key={tab} className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${i === 0 ? 'bg-white text-black' : 'bg-neutral-800 text-neutral-400 border border-neutral-700'}`}>
              {tab}
            </button>
          ))}
        </div>

        {/* Training List */}
        <div className="space-y-4">
          {upcomingTrainings.map((t) => (
            <Link key={t.id} href={`/trainings/${t.id}`} className="block group">
              <div className="rounded-2xl bg-neutral-900 border border-neutral-800 p-5 active:scale-[0.98] transition-all hover:border-neutral-700">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className={`inline-block px-2.5 py-1 rounded-md bg-${t.typeColor}-500/10 text-${t.typeColor}-400 text-[10px] font-bold tracking-wider mb-2 uppercase`}>
                      {t.type}
                    </span>
                    <h3 className="text-lg font-bold text-white">{t.title}</h3>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-y-2 text-sm text-neutral-400 mb-4">
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    {t.date}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {t.time}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-neutral-800/50 text-xs">
                  <div className="flex items-center">
                    <div className="flex -space-x-2 mr-2">
                      {[1, 2, 3].map((num) => (
                        <div key={num} className="w-6 h-6 rounded-full bg-neutral-700 border border-neutral-900" />
                      ))}
                    </div>
                    <span className="text-neutral-500">{t.RSVPs} 人已报名</span>
                  </div>
                  <span className="text-blue-400 font-medium group-hover:underline">管理报名 &rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 w-full bg-neutral-950/90 backdrop-blur-xl border-t border-neutral-900 pb-8 pt-2 px-6 flex justify-between items-center text-xs font-medium text-neutral-500">
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
          内卷榜
        </Link>
        <Link href="/profile" className="flex flex-col items-center gap-1 p-2 hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          我的
        </Link>
      </nav>
    </div>
  )
}
