import { z } from 'zod'
import { responses } from '@/shared/schemas/error-response.schema'
import { publicUserSchema } from '@/auth/contracts/user.schema'

const friendRequestResponseSchema = z.object({
  id: z.string(),
  requesterId: z.string(),
  addresseeId: z.string(),
  status: z.enum(['pending', 'accepted', 'declined']),
  createdAt: z.date(),
  updatedAt: z.date(),
})

const idParamSchema = z.object({
  id: z.string().uuid('Invalid friend request id'),
})

export const sendFriendRequestHttpSchema = {
  tags: ['friends'],
  summary: 'Send a friend request by email',
  body: z.object({
    addresseeEmail: z.string().email('Invalid email'),
  }),
  response: {
    201: friendRequestResponseSchema,
    ...responses(400, 401, 404, 409, 500),
  },
}

export const respondFriendRequestHttpSchema = {
  tags: ['friends'],
  summary: 'Accept or decline a friend request',
  params: idParamSchema,
  body: z.object({
    decision: z.enum(['accepted', 'declined']),
  }),
  response: {
    200: friendRequestResponseSchema,
    ...responses(400, 401, 403, 404, 500),
  },
}

export const listFriendsHttpSchema = {
  tags: ['friends'],
  summary: 'List all accepted friends for the authenticated user',
  response: {
    200: z.array(publicUserSchema),
    ...responses(401, 500),
  },
}

const pendingFriendRequestResponseSchema = z.object({
  id: z.string(),
  requester: publicUserSchema,
  createdAt: z.date(),
})

export const listPendingFriendRequestsHttpSchema = {
  tags: ['friends'],
  summary: 'List pending friend requests received by the authenticated user',
  response: {
    200: z.array(pendingFriendRequestResponseSchema),
    ...responses(401, 500),
  },
}