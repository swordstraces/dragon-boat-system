import Link from 'next/link'
import { getSelectedMember } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { signout } from '../login/actions'

export default async function ProfilePage() {
  const member = await getSelectedMember()

  if (!member) {
    redirect('/login')
  }

  const memberName = member.full_name || '队员'
  const userInitial = memberName.charAt(0)

  // Mock stats
  const stats = [
    { label: '本月出勤', value: '12次', color: 'text-emerald-400' },
    { label: '全勤率', value: '92%', color: 'text-blue-400' },
    { label: '队内排名', value: '4', color: 'text-orange-400' },
  ]

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans pb-24">
      <section className="px-6 pt-20 pb-12 bg-gradient-to-b from-neutral-900/50 to-neutral-950 border-b border-neutral-900">
        <div className="flex items-center gap-5 mb-8">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-blue-500 to-emerald-500 flex items-center justify-center text-3xl font-black shadow-2xl shadow-blue-500/20 border-2 border-white/10">
            {userInitial}
          </div>
          <div>
            <h1 className="text-3xl font-black mb-1">{memberName}</h1>
            <span className="px-2 py-0.5 rounded-md bg-neutral-800 text-[10px] font-bold text-neutral-500 uppercase tracking-widest border border-neutral-800">
              {member.role === 'coach' ? '教练员' : '在役队员'}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-3 w-full gap-3">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center p-4 bg-neutral-900 rounded-3xl border border-neutral-800/50">
              <span className={`text-2xl font-black ${stat.color}`}>{stat.value}</span>
              <span className="text-[9px] text-neutral-600 font-bold uppercase tracking-widest mt-1">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <main className="px-6 py-8 space-y-8">
        <div className="space-y-3">
          <h3 className="text-neutral-600 text-[10px] font-black uppercase tracking-[0.2em] px-2">成员功能</h3>
          <div className="bg-neutral-900 rounded-[2rem] border border-neutral-800 overflow-hidden divide-y divide-neutral-800/50">
            {member.role === 'coach' && (
              <Link href="/admin" className="flex items-center justify-between p-5 hover:bg-neutral-800 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </div>
                  <span className="font-bold text-sm">教练管理员后台</span>
                </div>
                <svg className="w-5 h-5 text-neutral-700 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            )}
            
            <Link href="#" className="flex items-center justify-between p-5 hover:bg-neutral-800 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                </div>
                <span className="font-bold text-sm">我的训练记录统计</span>
              </div>
              <svg className="w-5 h-5 text-neutral-700 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-neutral-600 text-[10px] font-black uppercase tracking-[0.2em] px-2">系统操作</h3>
          <div className="bg-neutral-900 rounded-[2rem] border border-neutral-800 overflow-hidden divide-y divide-neutral-800/50">
            <form action={signout}>
              <button className="w-full flex items-center justify-between p-5 hover:bg-neutral-800 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-neutral-800 text-neutral-500 flex items-center justify-center group-hover:bg-red-500/10 group-hover:text-red-500 transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                  </div>
                  <span className="font-bold text-sm text-neutral-500 group-hover:text-red-500 transition-colors">切换身份 / 退出</span>
                </div>
              </button>
            </form>
          </div>
        </div>

        <div className="text-center space-y-2 pt-10">
          <p className="text-[10px] text-neutral-700 font-bold tracking-[0.3em] uppercase">Built for Excellence</p>
          <div className="flex justify-center gap-2">
            <div className="h-1 w-6 rounded-full bg-blue-500/20"></div>
            <div className="h-1 w-6 rounded-full bg-emerald-500/20"></div>
            <div className="h-1 w-6 rounded-full bg-indigo-500/20"></div>
          </div>
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
        <Link href="/leaderboard" className="flex flex-col items-center gap-1 p-2 hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
          排行榜
        </Link>
        <Link href="/profile" className="flex flex-col items-center gap-1 p-2 text-white">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          我的
        </Link>
      </nav>
    </div>
  )
}
