import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function CheckInPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans pb-24">
      <header className="px-6 pt-12 pb-6 sticky top-0 bg-neutral-950/80 backdrop-blur-md z-10 flex items-center gap-4">
        <Link href="/" className="h-10 w-10 rounded-full bg-neutral-900 flex items-center justify-center text-white border border-neutral-800">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">今日打卡</h1>
          <p className="text-neutral-400 text-sm mt-1">滴水穿石，贵在坚持</p>
        </div>
      </header>

      <main className="px-6 space-y-6">
        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl p-6 shadow-xl shadow-orange-900/20 relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-20 text-9xl">🔥</div>
          <div className="relative z-10">
            <h2 className="text-white font-medium mb-1">本周已打卡</h2>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl font-black">3</span>
              <span className="text-orange-200">次</span>
            </div>
            <div className="flex items-center gap-1.5 w-full">
              {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                <div key={day} className={`flex-1 h-3 rounded-full ${day <= 3 ? 'bg-white' : 'bg-black/30'}`}></div>
              ))}
            </div>
            <p className="text-xs text-orange-200 mt-2">再打卡 1 次即可完成本周目标！</p>
          </div>
        </div>

        <form className="space-y-6">
          <section className="space-y-3">
            <h3 className="font-bold text-lg">打卡类型</h3>
            <div className="grid grid-cols-2 gap-3">
              <label className="cursor-pointer">
                <input type="radio" name="type" value="water" className="peer sr-only" defaultChecked />
                <div className="rounded-2xl border-2 border-neutral-800 bg-neutral-900 p-4 text-center peer-checked:border-orange-500 peer-checked:bg-orange-500/10 transition-colors">
                  <div className="text-2xl mb-1">🚣</div>
                  <div className="font-bold text-sm text-white">水上训练</div>
                </div>
              </label>
              <label className="cursor-pointer">
                <input type="radio" name="type" value="gym" className="peer sr-only" />
                <div className="rounded-2xl border-2 border-neutral-800 bg-neutral-900 p-4 text-center peer-checked:border-orange-500 peer-checked:bg-orange-500/10 transition-colors">
                  <div className="text-2xl mb-1">🏋️</div>
                  <div className="font-bold text-sm text-white">健身房体能</div>
                </div>
              </label>
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="font-bold text-lg">上传凭证照 (选填)</h3>
            <div className="border-2 border-dashed border-neutral-800 rounded-2xl bg-neutral-900 p-8 text-center flex flex-col items-center justify-center text-neutral-400 hover:border-neutral-600 transition-colors cursor-pointer">
              <svg className="w-8 h-8 mb-3 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <p className="text-sm font-medium">点击拍照或上传图片</p>
              <p className="text-xs mt-1">支持镜面自拍、运动手表截图等</p>
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="font-bold text-lg">训练心得 (选填)</h3>
            <textarea 
              className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-4 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 min-h-24 resize-none transition-colors text-white placeholder-neutral-600"
              placeholder="记录一下今天的训练感受、力量数据，或是遇到的技术瓶颈..."
            ></textarea>
          </section>

          <button type="button" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg rounded-2xl py-4 shadow-xl shadow-orange-500/20 active:scale-[0.98] transition-all">
            提交打卡
          </button>
        </form>
      </main>
    </div>
  )
}
