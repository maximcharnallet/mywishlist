import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { UserRepositoryImpl } from '@/auth/repositories/user.repository'
import { GetMeUseCase } from '@/auth/usecases/getMe.handler'
import { UpdateProfileUseCase } from '@/auth/usecases/updateProfile.hanlder'
import { getMeHttpSchema, updateMeHttpSchema } from './user.schema'

export async function userController(app: FastifyInstance) {
  const userRepository = new UserRepositoryImpl(app)
  const getMeUseCase = new GetMeUseCase(userRepository)
  const updateProfileUseCase = new UpdateProfileUseCase(userRepository)

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
}