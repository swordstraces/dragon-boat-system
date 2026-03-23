import Link from 'next/link'

export default function TipsPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans pb-24">
      <header className="px-6 pt-12 pb-6 sticky top-0 bg-neutral-950/80 backdrop-blur-md z-10 flex items-center gap-4">
        <Link href="/" className="h-10 w-10 rounded-full bg-neutral-900 flex items-center justify-center text-white border border-neutral-800">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">训练干货</h1>
          <p className="text-neutral-400 text-sm mt-1">划龙舟技术与力量提升指南</p>
        </div>
      </header>

      <main className="px-6 space-y-8">
        {/* Featured Video Card */}
        <section>
          <div className="relative rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 aspect-[16/9] group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-transparent z-10 flex flex-col justify-end p-5">
              <span className="px-2.5 py-1 rounded bg-blue-600 text-[10px] font-bold uppercase tracking-wider w-fit mb-2 text-white">技术动作</span>
              <h2 className="text-lg font-bold leading-tight">完美的入水 (Catch) 技术解析</h2>
            </div>
            {/* Play button overlay */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 ml-1 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="grid grid-cols-2 gap-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-5 hover:border-emerald-500/50 transition-colors cursor-pointer">
            <div className="text-3xl mb-3">💪</div>
            <h3 className="font-bold mb-1">核心力量专讲</h3>
            <p className="text-xs text-neutral-500">4 篇文章</p>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-5 hover:border-blue-500/50 transition-colors cursor-pointer">
            <div className="text-3xl mb-3">🚣‍♀️</div>
            <h3 className="font-bold mb-1">团队同步技巧</h3>
            <p className="text-xs text-neutral-500">2 个视频</p>
          </div>
        </section>

        {/* Article List */}
        <section className="space-y-4">
          <h3 className="font-bold text-lg mb-4">最新干货</h3>
          {[
            { tag: '体脂', title: '龙舟运动员的最佳体脂率与饮食方案', min: 5 },
            { tag: '背部', title: '硬拉与引体向上对拉水的惊人提升', min: 8 },
            { tag: '心理', title: '冲刺阶段的心理状态调节', min: 3 },
          ].map((article, i) => (
             <div key={i} className="flex gap-4 items-start p-4 bg-neutral-900 rounded-2xl border border-neutral-800 cursor-pointer hover:bg-neutral-800 transition-colors">
               <div className="w-16 h-16 rounded-xl bg-neutral-800 flex items-center justify-center flex-shrink-0 text-neutral-500 font-bold">
                 {article.tag}
               </div>
               <div>
                 <h4 className="font-bold text-sm text-white mb-2 leading-tight">{article.title}</h4>
                 <div className="flex items-center gap-2 text-xs text-neutral-500">
                   <span>阅读大概需要 {article.min} 分钟</span>
                 </div>
               </div>
             </div>
          ))}
        </section>
      </main>
    </div>
  )
}
