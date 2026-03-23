import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Assuming we check role here (e.g., user.user_metadata.role === 'coach')

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans pb-24">
      <header className="px-6 pt-12 pb-6 sticky top-0 bg-neutral-950/80 backdrop-blur-md z-10 flex items-center gap-4 border-b border-neutral-800">
        <Link href="/profile" className="h-10 w-10 rounded-full bg-neutral-900 flex items-center justify-center text-white border border-neutral-800">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-red-500">教练控制台</h1>
          <p className="text-neutral-400 text-sm mt-1">队伍管理与训练安排</p>
        </div>
      </header>

      <main className="px-6 py-6 space-y-8">
        {/* Absentee Warning */}
        <section>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-red-500">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            缺勤高危名单
          </h2>
          <div className="bg-red-950/30 border border-red-900/50 rounded-3xl p-4 divide-y divide-red-900/30">
            {[
               { name: '王木木', missed: 3, lastAttended: '5月20日' },
               { name: '刘小虎', missed: 2, lastAttended: '5月28日' }
            ].map((usr, i) => (
              <div key={i} className="py-3 first:pt-0 last:pb-0 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-white">{usr.name}</h3>
                  <p className="text-xs text-red-300/70 mt-1">连续缺席 {usr.missed} 次 (上次参加: {usr.lastAttended})</p>
                </div>
                <button className="px-3 py-1.5 bg-red-600 hover:bg-red-500 rounded-lg text-xs font-bold transition-colors">
                  发送提醒
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-5 hover:bg-neutral-800 transition-colors cursor-pointer">
            <div className="w-10 h-10 bg-indigo-500/20 text-indigo-400 rounded-full flex items-center justify-center mb-3">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            </div>
            <h3 className="font-bold mb-1">新建训练</h3>
            <p className="text-xs text-neutral-500">发布水上或陆地计划</p>
          </div>
          
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-5 hover:bg-neutral-800 transition-colors cursor-pointer">
            <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-3">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
            </div>
            <h3 className="font-bold mb-1">排兵布阵</h3>
            <p className="text-xs text-neutral-500">安排本周水上座次</p>
          </div>
          
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-5 hover:bg-neutral-800 transition-colors cursor-pointer">
            <div className="w-10 h-10 bg-orange-500/20 text-orange-400 rounded-full flex items-center justify-center mb-3">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>
            </div>
            <h3 className="font-bold mb-1">导出报表</h3>
            <p className="text-xs text-neutral-500">全队出勤率Excel导出</p>
          </div>
        </section>
      </main>
    </div>
  )
}
