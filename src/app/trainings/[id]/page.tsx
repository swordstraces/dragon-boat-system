import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function TrainingDetail() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Mock data
  const training = {
    id: 1, 
    title: '周末淀山湖水上20km合练', 
    date: '6月15日 周六', 
    time: '07:00 - 10:00', 
    type: '水上', 
    location: '上海青浦区淀山湖水上运动中心',
    description: '本次合练主要针对端午节比赛的500米直道竞速进行模拟测验，请大家务必准时到达场地进行热身。迟到者罚做100个俯卧撑。',
    RSVPs: [
      { name: '队长李雷', status: 'attending', boatSide: '左边', role: '划手' },
      { name: '韩梅梅', status: 'attending', boatSide: '右边', role: '划手' },
      { name: '王大锤', status: 'leave', role: '鼓手', reason: '出差' },
    ]
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans pb-24">
      {/* Header with Background */}
      <div className="relative h-64 w-full bg-neutral-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/40 to-blue-900/80 z-0"></div>
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-neutral-950 to-transparent z-0"></div>
        <div className="absolute top-12 left-6 z-10 flex w-full pr-12 justify-between items-center">
          <Link href="/trainings" className="h-10 w-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </Link>
          <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-xs font-medium border border-white/10">水上合练</span>
        </div>
      </div>

      <main className="px-6 -mt-16 relative z-10 space-y-8">
        {/* Title and Info */}
        <div>
          <h1 className="text-3xl font-black mb-4 leading-tight">{training.title}</h1>
          <div className="space-y-3 bg-neutral-900/50 backdrop-blur-md rounded-2xl p-5 border border-neutral-800">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-neutral-400 bg-neutral-800 p-2 rounded-xl">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <p className="font-bold">{training.date}</p>
                <p className="text-sm text-neutral-400">{training.time}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 pt-3 border-t border-neutral-800">
              <div className="mt-0.5 text-neutral-400 bg-neutral-800 p-2 rounded-xl">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <div>
                <p className="font-bold">{training.location}</p>
                <Link href="#" className="text-sm text-blue-400 hover:underline">查看地图 &rarr;</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Action Panel */}
        <div className="rounded-3xl bg-neutral-900 border border-neutral-800 p-1">
          <div className="flex justify-between p-1 bg-neutral-950 rounded-2xl">
            <button className="flex-1 py-3 text-center rounded-xl bg-emerald-500 font-bold text-white shadow-lg shadow-emerald-500/20">请战 (参加)</button>
            <button className="flex-1 py-3 text-center rounded-xl text-neutral-400 font-medium hover:text-white hover:bg-neutral-800 transition-colors">请假 (不参加)</button>
            <button className="flex-1 py-3 text-center rounded-xl text-neutral-400 font-medium hover:text-white hover:bg-neutral-800 transition-colors">待定</button>
          </div>
        </div>

        {/* Outline / Description */}
        <section>
          <h2 className="text-lg font-bold mb-3">训练安排</h2>
          <p className="text-neutral-400 text-sm leading-relaxed bg-neutral-900 p-4 rounded-2xl border border-neutral-800">{training.description}</p>
        </section>

        {/* RSVP List / Seating */}
        <section>
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-lg font-bold">已报名 ({training.RSVPs.filter(r => r.status === 'attending').length}人)</h2>
            <Link href="#" className="text-sm font-medium text-blue-400">查看排兵布阵图</Link>
          </div>
          <div className="bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden divide-y divide-neutral-800">
            {training.RSVPs.map((p, i) => (
              <div key={i} className="flex justify-between items-center p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-sm shadow-inner text-white">
                    {p.name.charAt(p.name.length - 1)}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-white">{p.name}</h4>
                    <p className="text-xs text-neutral-500">
                      {p.status === 'attending' ? `${p.role} · ${p.boatSide}` : p.reason}
                    </p>
                  </div>
                </div>
                <div className="text-xs font-bold px-2.5 py-1 rounded-md bg-neutral-950 border border-neutral-800">
                  {p.status === 'attending' ? <span className="text-emerald-400">已报名</span> : <span className="text-red-400">请假</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
