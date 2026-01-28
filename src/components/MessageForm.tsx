'use client'

import { useOptimistic, useRef } from 'react'
import { addMessage } from '@/app/actions/message'

export default function MessageForm({ userEmail }: { userEmail: string }) {
  const formRef = useRef<HTMLFormElement>(null)
  
  // 乐观更新：在服务器返回前先更新 UI
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    [],
    (state: any, newMessage: string) => [
      { content: newMessage, user_email: userEmail, created_at: new Date().toISOString(), id: Math.random() },
      ...state
    ]
  )

  async function clientAction(formData: FormData) {
    const content = formData.get('content') as string
    if (!content) return
    
    formRef.current?.reset()
    addOptimisticMessage(content) // 触发乐观更新
    await addMessage(null, formData)
  }

  return (
    <form ref={formRef} action={clientAction} className="flex gap-2 mb-8">
      <input name="content" className="flex-1 p-2 border rounded text-black" placeholder="聊聊吧..." />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">发送</button>
    </form>
  )
}