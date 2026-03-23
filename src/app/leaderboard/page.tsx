import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function LeaderboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const leaderboard = [
    { rank: 1, name: '队长李雷', count: 24, trend: 'up' },
    { rank: 2, name: '韩梅梅', count: 22, trend: 'up' },
    { rank: 3, name: '张伟', count: 21, trend: 'down' },
    { rank: 4, name: '王大锤', count: 18, trend: 'same' },
    { rank: 5, name: '刘备', count: 15, trend: 'up' },
    { rank: 6, name: '关羽', count: 14, trend: 'down' },
  ]

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans pb-24">
      <header className="px-6 pt-12 pb-6 sticky top-0 bg-neutral-950/80 backdrop-blur-md z-10">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">内卷排行榜</h1>
        <p className="text-neutral-400 text-sm mt-1">本月累计打卡次数</p>
      </header>

      <main className="px-6 space-y-6">
        {/* Top 3 Podium */}
        <div className="flex justify-center items-end h-48 gap-3 mt-4">
          {/* 2nd Place */}
          <div className="flex flex-col items-center w-24">
            <div className="w-12 h-12 rounded-full bg-slate-400 mb-2 border-2 border-slate-300 flex items-center justify-center font-bold shadow-lg shadow-slate-500/20 text-neutral-900">
              梅
            </div>
            <div className="w-full bg-gradient-to-t from-slate-800 to-slate-700 h-24 rounded-t-lg flex flex-col items-center justify-start pt-2 border-t-2 border-slate-500">
              <span className="text-xl font-bold text-slate-300">2</span>
              <span className="text-xs text-slate-400">{leaderboard[1].count}次</span>
            </div>
            <span className="text-xs font-medium mt-2 text-white">{leaderboard[1].name}</span>
          </div>

          {/* 1st Place */}
          <div className="flex flex-col items-center w-28 -mb-4 z-10">
            <div className="w-16 h-16 rounded-full bg-yellow-400 mb-2 border-2 border-yellow-200 flex items-center justify-center font-bold text-xl shadow-xl shadow-yellow-500/30 text-yellow-900">
              雷
            </div>
            <div className="w-full bg-gradient-to-t from-yellow-900/60 to-yellow-600 h-32 rounded-t-lg flex flex-col items-center justify-start pt-3 border-t-2 border-yellow-400 shadow-[0_-10px_20px_rgba(234,179,8,0.2)]">
              <span className="text-3xl font-black text-yellow-100 drop-shadow-md">1</span>
              <span className="text-sm font-bold text-yellow-200">{leaderboard[0].count}次</span>
            </div>
            <span className="text-sm font-bold text-yellow-500 mt-2">{leaderboard[0].name}</span>
          </div>

          {/* 3rd Place */}
          <div className="flex flex-col items-center w-24">
            <div className="w-12 h-12 rounded-full bg-amber-700 mb-2 border-2 border-amber-600 flex items-center justify-center font-bold shadow-lg shadow-amber-900/20 text-amber-100">
              张
            </div>
            <div className="w-full bg-gradient-to-t from-amber-950 to-amber-900 h-20 rounded-t-lg flex flex-col items-center justify-start pt-2 border-t-2 border-amber-700">
              <span className="text-xl font-bold text-amber-500">3</span>
              <span className="text-xs text-amber-600">{leaderboard[2].count}次</span>
            </div>
            <span className="text-xs font-medium mt-2 text-white">{leaderboard[2].name}</span>
          </div>
        </div>

        {/* The Rest of the list */}
        <div className="bg-neutral-900 rounded-3xl border border-neutral-800 p-2 space-y-1 mt-8">
          {leaderboard.slice(3).map((user) => (
            <div key={user.rank} className="flex items-center justify-between p-3 rounded-2xl hover:bg-neutral-800 transition-colors">
              <div className="flex items-center gap-4">
                <span className="w-6 text-center font-bold text-neutral-500">{user.rank}</span>
                <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center font-bold text-sm text-neutral-300">
                  {user.name.charAt(user.name.length - 1)}
                </div>
                <span className="font-medium text-white">{user.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-lg">{user.count}</span>
                {user.trend === 'up' && <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>}
                {user.trend === 'down' && <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>}
                {user.trend === 'same' && <svg className="w-4 h-4 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" /></svg>}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 w-full bg-neutral-950/90 backdrop-blur-xl border-t border-neutral-900 pb-8 pt-2 px-6 flex justify-between items-center text-xs font-medium text-neutral-500 z-50">
        <Link href="/" className="flex flex-col items-center gap-1 p-2 hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
          首页
        </Link>
        <Link href="/trainings" className="flex flex-col items-center gap-1 p-2 hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          计划
        </Link>
        <Link href="/leaderboard" className="flex flex-col items-center gap-1 p-2 text-white">
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
