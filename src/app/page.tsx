import { getSelectedMember } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function Dashboard() {
  const member = await getSelectedMember()

  if (!member) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white pb-24 font-sans selection:bg-emerald-500/30">
      {/* Header Profile Area */}
      <header className="px-6 pt-12 pb-6 flex items-center justify-between sticky top-0 z-10 bg-neutral-950/80 backdrop-blur-md">
        <div>
          <p className="text-neutral-400 text-sm font-medium">欢迎回来</p>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            {member.full_name}
          </h1>
        </div>
        <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-blue-500/20 border border-white/10">
          <span className="font-bold">{member.full_name?.charAt(0)}</span>
        </div>
      </header>

      <main className="px-6 space-y-8">
        {/* Match Countdown Card */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-800 p-6 shadow-xl shadow-blue-900/20">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
          <div className="relative z-10">
            <h2 className="text-blue-100 text-sm font-medium mb-1">距离下场正式比赛还有</h2>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black tracking-tighter">42</span>
              <span className="text-lg font-medium text-blue-200">天</span>
            </div>
          </div>
        </section>

        {/* Next Training Action */}
        <section>
          <div className="flex justify-between items-end mb-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <span className="h-3 w-1 rounded-full bg-emerald-400"></span>
              近期训练安排
            </h3>
            <Link href="/trainings" className="text-xs text-neutral-500 font-bold hover:text-white transition-colors">全部计划 &rarr;</Link>
          </div>
          <Link href="/trainings/1" className="block group">
            <div className="rounded-3xl bg-neutral-900 p-5 border border-neutral-800 hover:border-emerald-500/50 transition-all active:scale-[0.98]">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-2">水上合练</span>
                  <h4 className="text-xl font-bold">周末清晨水上20km测验</h4>
                </div>
                <div className="flex flex-col items-center bg-black/50 rounded-2xl p-2 min-w-[56px] border border-neutral-800">
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-tighter">6月</span>
                  <span className="text-xl font-black">15</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-neutral-400 font-medium">
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  07:00 - 10:00
                </div>
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  淀山湖基地
                </div>
              </div>
            </div>
          </Link>
        </section>

        {/* Quick Actions Grid */}
        <section className="grid grid-cols-2 gap-4">
          <Link href="/checkin" className="rounded-3xl bg-gradient-to-br from-orange-400 to-red-600 p-5 shadow-lg shadow-orange-500/20 active:scale-[0.98] transition-all">
            <div className="h-10 w-10 rounded-2xl bg-white/20 mb-3 flex items-center justify-center text-2xl">🔥</div>
            <h4 className="font-black text-lg text-white">今日打卡</h4>
            <p className="text-orange-100 text-[10px] font-bold uppercase tracking-wider mt-1 opacity-80">Check In Now</p>
          </Link>
          
          <Link href="/tips" className="rounded-3xl bg-neutral-900 border border-neutral-800 p-5 active:scale-[0.98] transition-all hover:bg-neutral-800">
            <div className="h-10 w-10 rounded-2xl bg-neutral-800 mb-3 flex items-center justify-center text-2xl">💡</div>
            <h4 className="font-black text-lg text-white">训练干货</h4>
            <p className="text-neutral-500 text-[10px] font-bold uppercase tracking-wider mt-1">Training Tips</p>
          </Link>
        </section>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 w-full bg-neutral-950/90 backdrop-blur-xl border-t border-neutral-900 pb-8 pt-2 px-6 flex justify-between items-center text-xs font-medium text-neutral-500 z-50">
        <Link href="/" className="flex flex-col items-center gap-1 p-2 text-white">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
          首页
        </Link>
        <Link href="/trainings" className="flex flex-col items-center gap-1 p-2 hover:text-white transition-colors">
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
