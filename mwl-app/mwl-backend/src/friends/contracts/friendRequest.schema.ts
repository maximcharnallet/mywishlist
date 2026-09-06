import { z } from 'zod'

export const friendRequestStatusSchema = z.enum(['pending', 'accepted', 'declined'])

export const friendRequestSchema = z.object({
  id: z.string(),
  requesterId: z.string(), 
  addresseeId: z.string(), 
  status: friendRequestStatusSchema,
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export type FriendRequest = z.infer<typeof friendRequestSchema>

export const friendRequestInputSchema = z.object({
  addresseeId: z.string(), 
})

export type FriendRequestInput = z.infer<typeof friendRequestInputSchema>