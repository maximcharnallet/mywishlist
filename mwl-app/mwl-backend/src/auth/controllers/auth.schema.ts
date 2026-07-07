import { z } from 'zod'
import { responses } from '@/shared/schemas/error-response.schema'


export const registerRouteSchema = {
  tags: ['auth'],
  summary: "Register a new user",
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email').min(1, 'Email is required'),
    password: z.string().min(1, 'Password is required'),
    passwordConfirm: z.string().min(1, 'Password confirmation is required'),
  }).refine((data) => data.password === data.passwordConfirm, {
    message: 'Passwords do not match',
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

export const loginRouteSchema = {
  tags: ['auth'],
  summary: "Login a user",
  body: z.object({
    email: z.string().email('Invalid email').min(1, 'Email is required'),
    password: z.string().min(1, 'Password is required'),
  }),
  response: {
    200: z.object({
      token: z.string(),
    }),
    ...responses(400, 401, 500),
  },
}