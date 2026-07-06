import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  email: z.string().email('L\'email est invalide').min(1, 'L\'email est requis'),
  password: z.string().min(1, 'Le mot de passe est requis'),
  passwordConfirm: z.string().min(1, 'La confirmation du mot de passe est requise'),
}).refine((data) => data.password === data.passwordConfirm, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['passwordConfirm'],
})

export type RegisterInput = z.infer<typeof registerSchema>