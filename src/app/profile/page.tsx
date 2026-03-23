import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const userEmail = user.email || '龙舟队员'
  const userInitial = userEmail.charAt(0).toUpperCase()

  // Mock stats for demonstration
  const stats = [
    { label: '本月出勤', value: '12次', color: 'text-emerald-400' },
    { label: '全勤率', value: '92%', color: 'text-blue-400' },
    { label: '队内排名', value: '第4名', color: 'text-orange-400' },
  ]

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans pb-24">
      {/* Profile Header */}
      <section className="px-6 pt-16 pb-12 bg-gradient-to-b from-neutral-900 to-neutral-950 border-b border-neutral-900">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 to-emerald-500 flex items-center justify-center text-4xl font-bold shadow-2xl shadow-blue-500/20 mb-4 border-2 border-white/10">
            {userInitial}
          </div>
          <h1 className="text-2xl font-bold mb-1">{userEmail.split('@')[0]}</h1>
          <p className="text-neutral-500 text-sm mb-6">{userEmail}</p>
          
          <div className="grid grid-cols-3 w-full gap-4 px-2">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center p-3 bg-neutral-900/50 rounded-2xl border border-neutral-800/50">
                <span className={`text-xl font-black ${stat.color}`}>{stat.value}</span>
                <span className="text-[10px] text-neutral-500 font-medium uppercase tracking-tight mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main className="px-6 py-8 space-y-6">
        {/* Settings Links */}
        <div className="space-y-2">
          <h3 className="text-neutral-500 text-xs font-bold uppercase tracking-widest px-2 mb-3">账号管理</h3>
          <div className="bg-neutral-900 rounded-3xl border border-neutral-800 overflow-hidden divide-y divide-neutral-800/50">
            <Link href="/admin" className="flex items-center justify-between p-4 hover:bg-neutral-800 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <span className="font-medium">教练/管理员后台</span>
              </div>
              <svg className="w-5 h-5 text-neutral-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
            
            <Link href="#" className="flex items-center justify-between p-4 hover:bg-neutral-800 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
                <span className="font-medium">个人资料设置</span>
              </div>
              <svg className="w-5 h-5 text-neutral-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>

        {/* System Settings */}
        <div className="space-y-2">
          <h3 className="text-neutral-500 text-xs font-bold uppercase tracking-widest px-2 mb-3">系统设置</h3>
          <div className="bg-neutral-900 rounded-3xl border border-neutral-800 overflow-hidden divide-y divide-neutral-800/50">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                </div>
                <span className="font-medium">训练提醒通知</span>
              </div>
              <div className="w-12 h-6 rounded-full bg-emerald-500 relative">
                <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white"></div>
              </div>
            </div>
            
            <form action="/auth/signout" method="post">
              <button className="w-full flex items-center justify-between p-4 hover:bg-neutral-800 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-neutral-800 text-neutral-400 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                  </div>
                  <span className="font-medium text-neutral-400 group-hover:text-red-400 transition-colors">退出登录</span>
                </div>
              </button>
            </form>
          </div>
        </div>

        <p className="text-center text-[10px] text-neutral-600 font-medium tracking-widest pt-4">
          DRAGON BOAT V1.0 · SWORD TRACES
        </p>
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
          内卷榜
        </Link>
        <Link href="/profile" className="flex flex-col items-center gap-1 p-2 text-white">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          我的
        </Link>
      </nav>
    </div>
  )
}
