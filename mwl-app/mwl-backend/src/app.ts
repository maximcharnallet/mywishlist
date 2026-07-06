import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import { authController } from './auth/controllers/auth.http'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import swaggerPlugin from './plugins/swagger'
import dbPlugin from './plugins/db'

export const buildApp = () => {
  const jwtSecret = process.env.JWT_SECRET

  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined in environment variables')
  }
  const app = fastify({ logger: true }).withTypeProvider<ZodTypeProvider>()

  app.register(fastifyJwt, { secret: jwtSecret })

  app.setValidatorCompiler(validatorCompiler)
  app.setSerializerCompiler(serializerCompiler)

  app.register(swaggerPlugin)
  app.register(dbPlugin)
  
  app.register(authController, { prefix: '/api/auth' })


  return app
}