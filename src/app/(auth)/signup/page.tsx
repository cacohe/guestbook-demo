import { signup } from '@/app/actions/auth'
import Link from 'next/link'

// 在 Next.js 15 中，Props 里的 searchParams 是一个 Promise
export default async function SignupPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ error?: string; message?: string }> 
}) {
  // 必须 await 才能读取参数内容
  const params = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 font-sans">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-10 shadow-xl text-black">
        
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">创建新账号</h2>
          <p className="mt-2 text-sm text-gray-500">
            加入社区，开始你的第一条留言
          </p>
        </div>

        {/* 交互表单 */}
        <form action={signup} className="mt-8 space-y-5">
          
          {/* 错误状态显示：从 URL 获取并通过 decodeURIComponent 解码 */}
          {params.error && (
            <div className="animate-in fade-in slide-in-from-top-2 rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-100">
              <span className="font-semibold">注册失败：</span>
              {decodeURIComponent(params.error)}
            </div>
          )}

          {/* 成功状态显示 */}
          {params.message && (
            <div className="animate-in fade-in slide-in-from-top-2 rounded-lg bg-green-50 p-3 text-sm text-green-600 border border-green-100">
              {decodeURIComponent(params.message)}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                邮箱地址
              </label>
              <input
                name="email"
                type="email"
                required
                className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 shadow-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none placeholder:text-gray-400"
                placeholder="name@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                设置密码
              </label>
              <input
                name="password"
                type="password"
                required
                minLength={6}
                className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 shadow-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none placeholder:text-gray-400"
                placeholder="至少 6 位字符"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 rounded-lg bg-blue-600 text-sm font-semibold text-white shadow-md hover:bg-blue-700 active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            立即注册
          </button>
        </form>

        <div className="pt-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-600">
            已有账号？{' '}
            <Link 
              href="/login" 
              className="font-semibold text-blue-600 hover:text-blue-500 transition-colors"
            >
              返回登录
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}