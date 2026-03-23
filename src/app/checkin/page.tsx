import Link from 'next/link'
import { getSelectedMember } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function CheckInPage() {
  const member = await getSelectedMember()

  if (!member) {
    redirect('/login')
  }

  const memberName = member.full_name || '队员'

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans pb-24">
      <header className="px-6 pt-16 pb-8 sticky top-0 bg-neutral-950/80 backdrop-blur-md z-10 flex items-center justify-between">
        <Link href="/" className="h-10 w-10 rounded-2xl bg-neutral-900 flex items-center justify-center text-white border border-neutral-800 active:scale-95 transition-all">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </Link>
        <div className="text-right">
          <h1 className="text-2xl font-black">训练打卡</h1>
          <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Training Check-in</p>
        </div>
      </header>

      <main className="px-6 space-y-8">
        {/* Status Card */}
        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-[2.5rem] p-8 shadow-xl shadow-orange-900/20 relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 opacity-20 text-[10rem] font-black rotate-12 select-none">GO</div>
          <div className="relative z-10">
            <h2 className="text-white/80 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Current Identity</h2>
            <div className="flex items-center gap-3 mb-8">
               <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-bold">{memberName.charAt(0)}</div>
               <span className="text-2xl font-black">{memberName}</span>
            </div>
            
            <div className="space-y-2">
               <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-orange-200">
                  <span>Weekly Goal</span>
                  <span>3 / 4 次</span>
               </div>
               <div className="flex items-center gap-2 w-full h-3 bg-black/30 rounded-full p-0.5">
                  <div className="bg-white h-full w-[75%] rounded-full shadow-sm"></div>
               </div>
            </div>
          </div>
        </div>

        <form className="space-y-8 pb-8">
          <section className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-500 px-2">选择打卡类型</h3>
            <div className="grid grid-cols-2 gap-4">
              <label className="cursor-pointer group">
                <input type="radio" name="type" value="water" className="peer sr-only" defaultChecked />
                <div className="rounded-[2rem] border-2 border-neutral-900 bg-neutral-900/50 p-6 text-center peer-checked:border-orange-500 peer-checked:bg-orange-500/10 transition-all group-active:scale-95">
                  <div className="text-4xl mb-3">🛶</div>
                  <div className="font-bold text-sm">水上实操</div>
                </div>
              </label>
              <label className="cursor-pointer group">
                <input type="radio" name="type" value="gym" className="peer sr-only" />
                <div className="rounded-[2rem] border-2 border-neutral-900 bg-neutral-900/50 p-6 text-center peer-checked:border-orange-500 peer-checked:bg-orange-500/10 transition-all group-active:scale-95">
                  <div className="text-4xl mb-3">🏋️</div>
                  <div className="font-bold text-sm">力量房/体能</div>
                </div>
              </label>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-500 px-2">图片凭证</h3>
            <div className="border-2 border-dashed border-neutral-800 rounded-[2rem] bg-neutral-900/30 p-10 text-center flex flex-col items-center justify-center text-neutral-600 hover:border-neutral-700 transition-colors cursor-pointer group active:scale-[0.98]">
              <div className="w-16 h-16 rounded-3xl bg-neutral-900 flex items-center justify-center mb-4 group-hover:bg-neutral-800 transition-colors">
                 <svg className="w-8 h-8 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <p className="font-bold text-sm text-neutral-400">点击拍照或上传图片</p>
              <p className="text-[10px] uppercase font-medium tracking-widest mt-1 opacity-50">Upload Evidence</p>
            </div>
          </section>

          <button type="button" className="w-full bg-white text-black font-black text-lg rounded-[2rem] py-5 shadow-2xl shadow-white/5 active:scale-[0.97] transition-all hover:bg-neutral-200">
            确认提交打卡
          </button>
        </form>
      </main>
    </div>
  )
}
