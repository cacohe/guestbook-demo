import { login } from '@/app/actions/auth'
import Link from 'next/link'

// 注意：这里的 Props 类型改为了 Promise
export default async function LoginPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ error?: string; message?: string }> 
}) {
  // 核心修复：在这里解包
  const params = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg text-black">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">欢迎回来</h2>
        
        <form action={login} className="mt-8 space-y-6">
          {/* 使用解包后的 params */}
          {params.error && (
            <div className="rounded bg-red-50 p-2 text-sm text-red-500 text-center border border-red-200">
              {decodeURIComponent(params.error)}
            </div>
          )}
          {params.message && (
            <div className="rounded bg-green-50 p-2 text-sm text-green-600 text-center border border-green-200">
              {decodeURIComponent(params.message)}
            </div>
          )}
          
          <div className="space-y-4 rounded-md shadow-sm">
            <input
              name="email"
              type="email"
              required
              className="relative block w-full rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 focus:z-10 focus:border-blue-500 focus:outline-none"
              placeholder="邮箱地址"
            />
            <input
              name="password"
              type="password"
              required
              className="relative block w-full rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 focus:z-10 focus:border-blue-500 focus:outline-none"
              placeholder="密码"
            />
          </div>
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            登录
          </button>
        </form>
        <p className="text-center text-sm text-gray-600">
          还没有账号？ <Link href="/signup" className="text-blue-600 hover:underline">立即注册</Link>
        </p>
      </div>
    </div>
  )
}