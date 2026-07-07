import z from "zod"

export const authSchema = z.object({
  email: z.string().email('Invalid email').min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
})

export type AuthInput = z.infer<typeof authSchema>