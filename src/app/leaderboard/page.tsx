import Link from 'next/link'
import { getSelectedMember, createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function LeaderboardPage() {
  const member = await getSelectedMember()

  if (!member) {
    redirect('/login')
  }

  const supabase = await createClient()

  // Try to fetch real leaderboard from DB
  let leaders: any[] = []
  try {
    const { data: membersData } = await supabase
      .from('members')
      .select('id, full_name, checkins(id)')
    
    if (membersData) {
      leaders = membersData.map((m: any) => ({
        id: m.id,
        name: m.full_name,
        count: m.checkins.length || 0,
        level: (m.checkins.length || 0) > 10 ? '核心主力' : '预备队员'
      })).sort((a, b) => b.count - a.count)
    }
  } catch (e) {}

  // Mock if DB not ready
  if (leaders.length === 0) {
    leaders = [
      { id: 1, name: '队长李雷', count: 24, level: '核心主力' },
      { id: 2, name: '韩梅梅', count: 21, level: '核心主力' },
      { id: 3, name: '张伟', count: 18, level: '预备队员' },
      { id: 4, name: '王大锤', count: 12, level: '预备队员' },
    ]
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans pb-24">
      <header className="px-6 pt-16 pb-12 bg-gradient-to-b from-neutral-900/50 to-neutral-950 border-b border-neutral-900">
        <h1 className="text-4xl font-black mb-1">内卷排行榜</h1>
        <p className="text-neutral-500 text-sm font-medium tracking-tight">谁才是队里的“全勤卷王”？🏆</p>
      </header>

      <main className="px-6 -mt-6">
        {/* Top 3 Podium */}
        <div className="flex items-end justify-center gap-4 mb-12">
           {/* 2nd */}
           <div className="flex flex-col items-center flex-1">
              <div className="h-10 w-10 text-2xl mb-2">🥈</div>
              <div className="w-16 h-16 rounded-2xl bg-neutral-800 border-2 border-neutral-700 flex items-center justify-center font-black text-xl mb-3 shadow-lg">
                 {leaders[1]?.name.charAt(0)}
              </div>
              <p className="text-xs font-bold text-neutral-400">{leaders[1]?.name}</p>
              <div className="h-20 w-full bg-neutral-900 rounded-t-2xl mt-4 flex items-center justify-center border-x border-t border-neutral-800">
                 <span className="font-black text-blue-400">{leaders[1]?.count || 0}</span>
              </div>
           </div>

           {/* 1st */}
           <div className="flex flex-col items-center flex-1">
              <div className="h-12 w-12 text-3xl mb-2 animate-bounce">👑</div>
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-yellow-500 to-orange-500 flex items-center justify-center font-black text-3xl mb-3 shadow-2xl shadow-orange-500/20 border-2 border-white/20">
                 {leaders[0]?.name.charAt(0)}
              </div>
              <p className="text-sm font-black italic">{leaders[0]?.name}</p>
              <div className="h-32 w-full bg-neutral-800 rounded-t-3xl mt-4 flex flex-col items-center justify-center border-x border-t border-neutral-700">
                 <span className="text-2xl font-black text-orange-400">{leaders[0]?.count || 0}</span>
                 <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">WINS</span>
              </div>
           </div>

           {/* 3rd */}
           <div className="flex flex-col items-center flex-1">
              <div className="h-8 w-8 text-xl mb-2">🥉</div>
              <div className="w-14 h-14 rounded-2xl bg-neutral-800 border border-neutral-700 flex items-center justify-center font-black text-lg mb-3 shadow-md">
                 {leaders[2]?.name.charAt(0)}
              </div>
              <p className="text-[10px] font-bold text-neutral-500">{leaders[2]?.name}</p>
              <div className="h-14 w-full bg-neutral-900 rounded-t-2xl mt-4 flex items-center justify-center border-x border-t border-neutral-800">
                 <span className="font-black text-emerald-400">{leaders[2]?.count || 0}</span>
              </div>
           </div>
        </div>

        {/* The List */}
        <div className="bg-neutral-900 rounded-[2.5rem] border border-neutral-800 overflow-hidden divide-y divide-neutral-800/50">
           {leaders.map((l, i) => (
             <div key={i} className="flex items-center justify-between p-6">
                <div className="flex items-center gap-5">
                   <span className="text-xl font-black italic opacity-20 w-6">#{i + 1}</span>
                   <div>
                      <h4 className="font-bold text-sm text-white">{l.name}</h4>
                      <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest">{l.level}</p>
                   </div>
                </div>
                <div className="text-right">
                   <div className="text-xl font-black">{l.count}</div>
                   <div className="text-[9px] font-bold text-neutral-600 uppercase tracking-widest">Times</div>
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
