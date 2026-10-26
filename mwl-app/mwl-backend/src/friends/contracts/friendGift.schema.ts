import { z } from 'zod'
import { giftSchema } from '@/gifts/contracts/gift.schema'

export const friendGiftSchema = giftSchema.extend({
  isReserved: z.boolean(),
  reservedByMe: z.boolean(),
})

export type FriendGift = z.infer<typeof friendGiftSchema>