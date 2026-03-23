import { selectMember } from './actions'
import { createClient } from '@/utils/supabase/server'

export default async function LoginPage() {
  const supabase = await createClient()
  
  // Try to fetch members from DB, fallback to mock if DB not ready
  let members = []
  try {
    const { data } = await supabase.from('members').select('*').order('full_name')
    members = data || []
  } catch (e) {
    // Fallback if table doesn't exist yet
  }

  const mockMembers = [
    { id: '1', full_name: '队长李雷', role: 'coach' },
    { id: '2', full_name: '韩梅梅', role: 'member' },
    { id: '3', full_name: '张伟', role: 'member' },
    { id: '4', full_name: '王大锤', role: 'member' },
    { id: '5', full_name: '刘备', role: 'member' },
    { id: '6', full_name: '关羽', role: 'member' },
  ]

  const displayMembers = members.length > 0 ? members : mockMembers

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-black bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            龙舟训练系统
          </h1>
          <p className="text-neutral-500 font-medium">请选择您的身份进入系统</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {displayMembers.map((member) => (
            <form key={member.id} action={selectMember}>
              <input type="hidden" name="memberId" value={member.id} />
              <button
                type="submit"
                className="w-full p-4 rounded-3xl bg-neutral-900 border border-neutral-800 hover:border-emerald-500/50 hover:bg-neutral-800 transition-all active:scale-95 group"
              >
                <div className="h-12 w-12 rounded-full bg-neutral-800 mb-3 mx-auto flex items-center justify-center text-xl group-hover:bg-emerald-500/20 transition-colors">
                  {member.role === 'coach' ? '🛶' : '🚣'}
                </div>
                <div className="font-bold text-sm">{member.full_name}</div>
                <div className="text-[10px] text-neutral-500 uppercase tracking-widest mt-1">
                  {member.role === 'coach' ? '教练/队长' : '队员'}
                </div>
              </button>
            </form>
          ))}
        </div>

        <p className="text-center text-[10px] text-neutral-700 font-bold uppercase tracking-[0.2em] pt-8">
          SWORD TRACES · DRAGON BOAT TEAM
        </p>
      </div>
    </div>
  )
}
