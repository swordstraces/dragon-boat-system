import { enterSystem } from './actions'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-[2rem] bg-gradient-to-tr from-blue-600 to-emerald-500 shadow-2xl shadow-emerald-500/20 mb-4">
             <span className="text-3xl">🛶</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight">龙舟训练管理</h1>
          <p className="text-neutral-500 font-medium">输入您的真实姓名进入系统</p>
        </div>

        <form action={enterSystem} className="space-y-6">
          <div className="space-y-2">
            <input
              type="text"
              name="name"
              placeholder="例如：张伟"
              required
              autoFocus
              className="w-full bg-neutral-900 border-2 border-neutral-800 rounded-3xl px-6 py-5 text-lg font-bold placeholder:text-neutral-700 focus:border-emerald-500 focus:outline-none transition-all shadow-inner"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-white text-black font-black text-xl rounded-3xl py-5 shadow-2xl shadow-white/5 active:scale-[0.97] transition-all hover:bg-neutral-200"
          >
            开启训练 &rarr;
          </button>
        </form>

        <div className="pt-12 text-center">
           <p className="text-[10px] text-neutral-700 font-bold uppercase tracking-[0.3em] mb-4">Developed for Dragon Boat</p>
           <div className="flex justify-center gap-1.5 opacity-30">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-neutral-500"></div>
           </div>
        </div>
      </div>
    </div>
  )
}
