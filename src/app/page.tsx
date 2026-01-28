import { createClient } from '@/lib/supabase'
import MessageForm from '@/components/MessageForm'
import { logout } from '@/app/actions/auth'

export default async function Home() {
  const supabase = await createClient()
  
  // 获取当前用户
  const { data: { user } } = await (supabase).auth.getUser()
  
  // 级联查询：获取 message 的同时获取对应的 profile 昵称
  const { data: messages } = await (supabase)
    .from('messages')
    .select('*, profiles(display_name)')
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-black">社区留言板</h1>
        <form action={logout}><button className="text-sm text-gray-500">登出</button></form>
      </div>
      
      <MessageForm userEmail={user?.email || ''} />

      <div className="space-y-4">
        {messages?.map((m: any) => (
          <div key={m.id} className="p-4 bg-white border rounded shadow-sm text-black">
            <p>{m.content}</p>
            <p className="text-xs text-blue-500 mt-2">@{m.profiles?.display_name || '路人'}</p>
          </div>
        ))}
      </div>
    </div>
  )
}