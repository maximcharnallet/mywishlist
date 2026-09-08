import { z } from 'zod'

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  avatarColor: z.string().default('#F25C74'),
  createdAt: z.date(),
})
export type UserDTO = z.infer<typeof userSchema>

export const publicUserSchema = userSchema.omit({ email: true })
export type PublicUser = z.infer<typeof publicUserSchema>