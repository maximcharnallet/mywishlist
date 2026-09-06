import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { UserRepositoryImpl } from '@/auth/repositories/user.repository'
import { FriendRequestRepositoryImpl } from '@/friends/repositories/friendRequest.repository'
import { SendFriendRequestUseCase } from '@/friends/usecases/sendFriendRequest.usecase'
import { RespondFriendRequestUseCase } from '@/friends/usecases/respondFriendRequest.usecase'
import { ListFriendsUseCase } from '@/friends/usecases/listFriends.usecase'
import { ListPendingFriendRequestsUseCase } from '@/friends/usecases/listPendingFriendRequests.usecase'
import {
  sendFriendRequestHttpSchema,
  respondFriendRequestHttpSchema,
  listFriendsHttpSchema,
  listPendingFriendRequestsHttpSchema,
} from './friend.schema'

export async function friendController(app: FastifyInstance) {
  app.log.debug('Registering friend controller routes')

  const userRepository = new UserRepositoryImpl(app)
  const friendRequestRepository = new FriendRequestRepositoryImpl(app)

  const sendFriendRequestUseCase = new SendFriendRequestUseCase(userRepository, friendRequestRepository)
  const respondFriendRequestUseCase = new RespondFriendRequestUseCase(friendRequestRepository)
  const listFriendsUseCase = new ListFriendsUseCase(userRepository, friendRequestRepository)
  const listPendingFriendRequestsUseCase = new ListPendingFriendRequestsUseCase(userRepository, friendRequestRepository)

  app.withTypeProvider<ZodTypeProvider>().post(
    '/',
    { schema: sendFriendRequestHttpSchema, onRequest: [app.authenticate] },
    async (request, reply) => {
      const requesterId = request.user.id
      const { addresseeEmail } = request.body
      const friendRequest = await sendFriendRequestUseCase.execute(requesterId, addresseeEmail)
      return reply.status(201).send(friendRequest)
    },
  )

  app.withTypeProvider<ZodTypeProvider>().patch(
    '/:id',
    { schema: respondFriendRequestHttpSchema, onRequest: [app.authenticate] },
    async (request, reply) => {
      const currentUserId = request.user.id
      const { id } = request.params
      const { decision } = request.body
      const friendRequest = await respondFriendRequestUseCase.execute(id, currentUserId, decision)
      return reply.status(200).send(friendRequest)
    },
  )

  app.withTypeProvider<ZodTypeProvider>().get(
    '/',
    { schema: listFriendsHttpSchema, onRequest: [app.authenticate] },
    async (request, reply) => {
      const userId = request.user.id
      const friends = await listFriendsUseCase.execute(userId)
      return reply.status(200).send(friends)
    },
  )

  app.withTypeProvider<ZodTypeProvider>().get(
    '/pending',
    { schema: listPendingFriendRequestsHttpSchema, onRequest: [app.authenticate] },
    async (request, reply) => {
      const userId = request.user.id
      const pending = await listPendingFriendRequestsUseCase.execute(userId)
      return reply.status(200).send(pending)
    },
  )
}