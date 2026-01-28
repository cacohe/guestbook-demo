import { z } from 'zod';

export const MessageSchema = z.object({
  content: z.string().min(1, "留言不能为空").max(200, "最多200字"),
});

export type MessageInput = z.infer<typeof MessageSchema>;