import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { UserRepositoryImpl } from '@/auth/repositories/user.repository'
import { GetMeUseCase } from '@/auth/usecases/getMe.handler'
import { UpdateProfileUseCase } from '@/auth/usecases/updateProfile.hanlder'
import { deleteMeHttpSchema, getMeHttpSchema, updateMeHttpSchema } from './user.schema'
import { DeleteUserUseCase } from '@/auth/usecases/deleteUser.handler'

export async function userController(app: FastifyInstance) {
  const userRepository = new UserRepositoryImpl(app)
  const getMeUseCase = new GetMeUseCase(userRepository)
  const updateProfileUseCase = new UpdateProfileUseCase(userRepository)
  const deleteUserUseCase = new DeleteUserUseCase(userRepository)

  app.withTypeProvider<ZodTypeProvider>().get(
    '/me',
    { schema: getMeHttpSchema, onRequest: [app.authenticate] },
    async (request, reply) => {
      const me = await getMeUseCase.execute(request.user.id)
      return reply.status(200).send(me)
    },
  )

  app.withTypeProvider<ZodTypeProvider>().patch(
    '/me',
    { schema: updateMeHttpSchema, onRequest: [app.authenticate] },
    async (request, reply) => {
      const updated = await updateProfileUseCase.execute(request.user.id, request.body)
      return reply.status(200).send(updated)
    },
  )

  app.withTypeProvider<ZodTypeProvider>().delete(
    '/me',
    { schema: deleteMeHttpSchema, onRequest: [app.authenticate] },
    async (request, reply) => {
      const deleted = await deleteUserUseCase.execute(request.user.id)
      return reply.status(200).send(deleted)
    },
  )
}