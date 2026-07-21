import { z } from 'zod'
import { responses } from '@/shared/schemas/error-response.schema'

const giftResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  price: z.number().nullable(),
  userId: z.string(),
  createdAt: z.date(),
})

const idParamSchema = z.object({
  id: z.string().uuid('Invalid gift id'),
})

export const createGiftHttpSchema = {
  tags: ['gifts'],
  summary: 'Create a new gift',
  body: z.object({
    title: z.string().min(1, 'Le titre est requis'),
    description: z.string().optional(),
    price: z.number().positive().optional(),
  }),
  response: {
    201: giftResponseSchema,
    ...responses(400, 401, 500),
  },
}

export const getAllGiftsHttpSchema = {
  tags: ['gifts'],
  summary: 'Get all gifts for the authenticated user',
  response: {
    200: z.array(giftResponseSchema),
    ...responses(401, 500),
  },
}

export const updateGiftHttpSchema = {
  tags: ['gifts'],
  summary: 'Update a gift',
  params: idParamSchema,
  body: z
    .object({
      title: z.string().min(1, 'Le titre est requis').optional(),
      description: z.string().optional(),
      price: z.number().positive().optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: 'At least one field must be provided',
    }),
  response: {
    200: giftResponseSchema,
    ...responses(400, 401, 404, 500),
  },
}

export const deleteGiftHttpSchema = {
  tags: ['gifts'],
  summary: 'Delete a gift',
  params: idParamSchema,
  response: {
    204: z.void(),
    ...responses(401, 404, 500),
  },
}