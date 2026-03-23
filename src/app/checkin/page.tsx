import Link from 'next/link'
import { getSelectedMember, createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { submitCheckIn } from '@/app/actions'

export default async function CheckInPage() {
  const member = await getSelectedMember()

  if (!member) {
    redirect('/login')
  }

  const memberName = member.full_name || '队员'

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans pb-24">
      <header className="px-6 pt-16 pb-8 sticky top-0 bg-neutral-950/80 backdrop-blur-md z-10 flex items-center justify-between">
        <Link href="/" className="h-12 w-12 rounded-2xl bg-neutral-900 flex items-center justify-center text-white border border-neutral-800 active:scale-95 transition-all">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </Link>
        <div className="text-right">
          <h1 className="text-3xl font-black">训练打卡</h1>
          <p className="text-[10px] text-neutral-600 font-black uppercase tracking-[0.2em]">Check-in Console</p>
        </div>
      </header>

      <main className="px-6 space-y-12">
        <form action={submitCheckIn} className="space-y-12 pb-8">
          {/* Identity Confirmation */}
          <div className="p-1 bg-neutral-900 rounded-[2.5rem] border border-neutral-800">
             <div className="flex items-center gap-4 p-5">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-orange-400 to-red-600 flex items-center justify-center font-black text-lg">
                   {memberName.charAt(0)}
                </div>
                <div>
                   <h2 className="text-xl font-black text-white">{memberName}</h2>
                   <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">确认您的打卡身份</p>
                </div>
             </div>
          </div>

          <section className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-500 px-2">打卡项目</h3>
            <div className="grid grid-cols-2 gap-4">
              <label className="cursor-pointer group">
                <input type="radio" name="type" value="water" className="peer sr-only" defaultChecked />
                <div className="rounded-[2.5rem] border-2 border-neutral-900 bg-neutral-900 p-8 text-center peer-checked:border-emerald-500 peer-checked:bg-emerald-500/10 transition-all active:scale-95">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🛶</div>
                  <div className="font-black text-sm uppercase tracking-widest">水上训练</div>
                </div>
              </label>
              <label className="cursor-pointer group">
                <input type="radio" name="type" value="gym" className="peer sr-only" />
                <div className="rounded-[2.5rem] border-2 border-neutral-900 bg-neutral-900 p-8 text-center peer-checked:border-orange-500 peer-checked:bg-orange-500/10 transition-all active:scale-95">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🏋️</div>
                  <div className="font-black text-sm uppercase tracking-widest">力量体能</div>
                </div>
              </label>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-500 px-2">训练备注</h3>
            <textarea 
              name="notes"
              placeholder="记录你的心得或强度（可选）"
              className="w-full h-32 bg-neutral-900 border-2 border-neutral-800 rounded-[2rem] p-6 text-sm font-bold placeholder:text-neutral-700 focus:border-emerald-500 focus:outline-none transition-all"
            ></textarea>
          </section>

          <section className="space-y-4">
             <h3 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-500 px-2">图片上传说明</h3>
             <div className="p-8 text-center bg-neutral-900/40 rounded-[2.5rem] border-2 border-dashed border-neutral-800 text-neutral-600 font-bold italic text-xs">
                照片上传功能正在接入存储，请先提交文字打卡
             </div>
          </section>

          <button type="submit" className="w-full bg-white text-black font-black text-xl rounded-[2.5rem] py-6 shadow-2xl shadow-emerald-500/10 active:scale-[0.97] transition-all hover:bg-neutral-200">
            立即提交打卡
          </button>
        </form>
      </main>
    </div>
  )
}
