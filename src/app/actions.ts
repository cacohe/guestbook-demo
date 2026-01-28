'use server'

import { createClient } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';


// 添加留言
export async function addMessage(formData: FormData) {
  const content = formData.get('content') as string;

  if (!content) return;

  // 插入数据到 Supabase
  const supabase = await createClient()
  await supabase.from('messages').insert([{ content }]);

  // 重新验证页面，让页面立即刷新显示新数据
  revalidatePath('/');
}