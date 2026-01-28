import { supabase } from '@/lib/supabase';
import { addMessage } from './actions';

// 定义数据类型
type Message = {
  id: number;
  content: string;
  created_at: string;
};

// 这是一个异步 Server Component
export default async function Home() {
  // 1. 从 Supabase 获取数据 (按时间倒序)
  // 此处 { cache: 'no-store' } 确保每次刷新都是最新数据
  const { data: messages } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-gray-50">
      <div className="z-10 max-w-lg w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center text-black">云端留言板</h1>

        {/* 2. 留言表单 (关联 Server Action) */}
        <form action={addMessage} className="flex gap-2 mb-8">
          <input
            name="content"
            type="text"
            placeholder="写下你的想法..."
            className="flex-1 p-3 border rounded-lg text-black"
            required
          />
          <button
            type="submit"
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            发送
          </button>
        </form>

        {/* 3. 展示留言列表 */}
        <div className="space-y-4">
          {messages?.map((msg: Message) => (
            <div key={msg.id} className="p-4 bg-white shadow rounded-lg border border-gray-100">
              <p className="text-lg text-gray-800">{msg.content}</p>
              <p className="text-xs text-gray-400 mt-2">
                {new Date(msg.created_at).toLocaleString()}
              </p>
            </div>
          ))}
          {(!messages || messages.length === 0) && (
            <p className="text-center text-gray-400">暂无留言，抢占沙发！</p>
          )}
        </div>
      </div>
    </main>
  );
}