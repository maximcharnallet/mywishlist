import { GiftRepository } from '@/gifts/repositories/gift.interface'
import { GiftRepositoryImpl } from '@/gifts/repositories/gift.repository'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { CreateGiftUsecase } from '@/gifts/usecases/gift.create.handler'
import { GetAllGiftsUsecase } from '@/gifts/usecases/gift.getAll.handler'
import { UpdateGiftUsecase } from '@/gifts/usecases/gift.update.handler'
import { DeleteGiftUsecase } from '@/gifts/usecases/gift.delete.handler'
import {
  createGiftHttpSchema,
  updateGiftHttpSchema,
  getAllGiftsHttpSchema,
  deleteGiftHttpSchema,
} from './gift.schema'

export async function giftController(app: FastifyInstance) {
  app.log.debug('Registering gift controller routes')

  const giftRepository: GiftRepository = new GiftRepositoryImpl(app)
  const createGiftUsecase = new CreateGiftUsecase(giftRepository)
  const getGiftUsecase = new GetAllGiftsUsecase(giftRepository)
  const updateGiftUsecase = new UpdateGiftUsecase(giftRepository)
  const deleteGiftUsecase = new DeleteGiftUsecase(giftRepository)

  app.withTypeProvider<ZodTypeProvider>().post(
    '/',
    { 
      schema: createGiftHttpSchema, 
      onRequest: [app.authenticate] 
    },
    async (request, reply) => {
      const userId = request.user.id
      const gift = await createGiftUsecase.execute({
        userId,
        ...request.body,
      })
      return reply.status(201).send(gift)
    },
  )

  app.withTypeProvider<ZodTypeProvider>().get(
    '/',
    { schema: getAllGiftsHttpSchema, onRequest: [app.authenticate] },
    async (request, reply) => {
      const userId = request.user.id
      const gifts = await getGiftUsecase.execute(userId)
      return reply.status(200).send(gifts)
    },
  )

  app.withTypeProvider<ZodTypeProvider>().patch(
    '/:id',
    { schema: updateGiftHttpSchema, onRequest: [app.authenticate] },
    async (request, reply) => {
      const userId = request.user.id
      const { id } = request.params
      const gift = await updateGiftUsecase.execute(id, userId, request.body)
      if (!gift) {
        return reply.status(404).send({ message: 'Gift not found' })
      }
      return reply.status(200).send(gift)
    },
  )

  app.withTypeProvider<ZodTypeProvider>().delete(
    '/:id',
    { schema: deleteGiftHttpSchema, onRequest: [app.authenticate] },
    async (request, reply) => {
      const userId = request.user.id
      const { id } = request.params
      const deleted = await deleteGiftUsecase.execute(id, userId)
      if (!deleted) {
        return reply.status(404).send({ message: 'Gift not found' })
      }
      return reply.status(204).send()
    },
  )
}