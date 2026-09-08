import { z } from 'zod'
import { responses } from '@/shared/schemas/error-response.schema'
import { publicUserSchema } from '@/auth/contracts/user.schema'

export const getMeHttpSchema = {
  tags: ['users'],
  summary: 'Get the authenticated user profile',
  response: {
    200: publicUserSchema,
    ...responses(401, 404, 500),
  },
}

export const updateMeHttpSchema = {
  tags: ['users'],
  summary: "Update the authenticated user's name and avatar color",
  body: z.object({
    name: z.string().min(1).max(255).optional(),
    avatarColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid hex color').optional(),
  }),
  response: {
    200: publicUserSchema,
    ...responses(400, 401, 404, 500),
  },
}