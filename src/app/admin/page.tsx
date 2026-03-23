import Link from 'next/link'
import { getSelectedMember } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function AdminPage() {
  const member = await getSelectedMember()

  if (!member || member.role !== 'coach') {
    // Basic protection: only coaches can see this
    // If we wanted even more security, we could add a PIN check page here
    redirect('/profile')
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans pb-24">
      <header className="px-6 pt-16 pb-8 sticky top-0 bg-neutral-950/80 backdrop-blur-md z-10 flex items-center justify-between border-b border-neutral-900">
        <div className="flex items-center gap-4">
          <Link href="/profile" className="h-10 w-10 rounded-2xl bg-neutral-900 flex items-center justify-center text-white border border-neutral-800 active:scale-95 transition-all">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </Link>
          <div>
            <h1 className="text-2xl font-black text-red-500">教练控制台</h1>
            <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Team Management</p>
          </div>
        </div>
      </header>

      <main className="px-6 py-8 space-y-8">
        {/* Absentee Warning */}
        <section className="space-y-4">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-red-500/80 px-2 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            出勤预警 (连续缺席)
          </h2>
          <div className="bg-red-950/10 border border-red-900/30 rounded-[2.5rem] p-4 divide-y divide-red-900/20">
            {[
               { name: '王木木', missed: 3, lastAttended: '05/20' },
               { name: '刘小虎', missed: 2, lastAttended: '05/28' }
            ].map((usr, i) => (
              <div key={i} className="py-4 first:pt-2 last:pb-2 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center font-black">
                     {usr.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">{usr.name}</h3>
                    <p className="text-[10px] text-red-300/50 font-bold tracking-widest uppercase mt-0.5">Missed {usr.missed} Sessions</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-red-900/20">
                  一键催报
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Management Actions */}
        <section className="grid grid-cols-2 gap-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-[2rem] p-6 hover:bg-neutral-800 transition-all cursor-pointer group active:scale-[0.98]">
            <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center mb-4 border border-indigo-500/20 group-hover:bg-indigo-500 group-hover:text-white transition-all">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            </div>
            <h3 className="font-black text-sm uppercase tracking-widest">新建训练</h3>
            <p className="text-[10px] text-neutral-500 font-bold mt-1 uppercase">Create Entry</p>
          </div>
          
          <div className="bg-neutral-900 border border-neutral-800 rounded-[2rem] p-6 hover:bg-neutral-800 transition-all cursor-pointer group active:scale-[0.98]">
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center mb-4 border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white transition-all">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
            </div>
            <h3 className="font-black text-sm uppercase tracking-widest">排兵布阵</h3>
            <p className="text-[10px] text-neutral-500 font-bold mt-1 uppercase">Boat Seating</p>
          </div>
          
          <div className="bg-neutral-900 border border-neutral-800 rounded-[2rem] p-6 hover:bg-neutral-800 transition-all cursor-pointer group active:scale-[0.98]">
            <div className="w-12 h-12 bg-orange-500/10 text-orange-400 rounded-2xl flex items-center justify-center mb-4 border border-orange-500/20 group-hover:bg-orange-500 group-hover:text-white transition-all">
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>
            </div>
            <h3 className="font-black text-sm uppercase tracking-widest">统计报表</h3>
            <p className="text-[10px] text-neutral-500 font-bold mt-1 uppercase">Statistics</p>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-[2rem] p-6 hover:bg-neutral-800 transition-all cursor-pointer group active:scale-[0.98]">
            <div className="w-12 h-12 bg-neutral-800 text-neutral-500 rounded-2xl flex items-center justify-center mb-4 border border-neutral-700 group-hover:bg-white group-hover:text-black transition-all">
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
            </div>
            <h3 className="font-black text-sm uppercase tracking-widest">全队设置</h3>
            <p className="text-[10px] text-neutral-500 font-bold mt-1 uppercase">Preferences</p>
          </div>
        </section>
      </main>
    </div>
  )
}
