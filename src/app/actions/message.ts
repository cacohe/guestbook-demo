'use server'

import { createClient } from '@/lib/supabase'
import { MessageSchema } from '@/lib/schema'
import { revalidatePath } from 'next/cache'

export async function addMessage(prevState: any, formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: '请先登录' }

  // Zod 校验
  const validatedFields = MessageSchema.safeParse({
    content: formData.get('content'),
  })

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors.content?.[0] }
  }

  const { error } = await supabase.from('messages').insert([
    { content: validatedFields.data.content, user_id: user.id }
  ])

  if (error) return { error: "数据库写入失败" }

  revalidatePath('/')
  return { success: true }
}