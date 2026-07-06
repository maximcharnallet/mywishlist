import { z } from 'zod'
import { responses } from '@/shared/schemas/error-response.schema'


export const registerRouteSchema = {
  tags: ['auth'],
  summary: "Inscription d'un nouvel utilisateur",
  body: z.object({
    name: z.string().min(1, 'Le nom est requis'),
    email: z.string().email('L\'email est invalide').min(1, 'L\'email est requis'),
    password: z.string().min(1, 'Le mot de passe est requis'),
    passwordConfirm: z.string().min(1, 'La confirmation du mot de passe est requise'),
  }).refine((data) => data.password === data.passwordConfirm, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['passwordConfirm'],
  }),
  response: {
    201: z.object({
      message: z.string(),
      user: z.object({
        id: z.string(),
        name: z.string(),
        email: z.string().email(),
      }),
    }),
    ...responses(400, 409, 500),
  },
}