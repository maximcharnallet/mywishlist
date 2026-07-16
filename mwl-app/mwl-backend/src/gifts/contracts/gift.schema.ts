import { z } from 'zod'
import { giftInputSchema } from './gitf.input.schema'


export const giftSchema = giftInputSchema.extend({
  id: z.string(),
  userId: z.string(), 
  createdAt: z.date().optional(),
})

export type Gift = z.infer<typeof giftSchema>

export type ListGifts = Gift[]