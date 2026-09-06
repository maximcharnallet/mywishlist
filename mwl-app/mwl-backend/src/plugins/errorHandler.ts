import type { FastifyInstance, FastifyError } from 'fastify'
import fp from 'fastify-plugin'
import { AppError } from '@/shared/errors/app-error'

export default fp(async function errorHandlerPlugin(app: FastifyInstance) {
  app.setErrorHandler((error: FastifyError, request, reply) => {
    if (error instanceof AppError) {
      request.log.warn({ err: error }, error.message)
      return reply.status(error.statusCode).send({ message: error.message })
    }

    if (error.validation) {
      return reply.status(400).send({ message: error.message })
    }

    request.log.error(error)
    return reply.status(500).send({ message: 'Internal server error' })
  })
})