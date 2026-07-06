import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { registerRouteSchema } from './auth.schema'
import { RegisterUseCase } from '@/auth/usecases/register.handler'
import { UserRepositoryImpl } from '@/auth/repositories/user.repository'
import { UserAlreadyExistsError } from '../errors/userAlreadyExistsError'


export async function authController(fastify: FastifyInstance) {
  fastify.log.debug('Registering auth controller routes')

  const userRepository = new UserRepositoryImpl(fastify)
  const registerUseCase = new RegisterUseCase(userRepository)


  fastify.withTypeProvider<ZodTypeProvider>().post(
      '/register',
      { 
      schema: registerRouteSchema 
      },
      async (request, reply) => {
        try{
          const user = await registerUseCase.execute(request.body)
          return reply.status(201).send({ message: 'User registered successfully', user })
        } catch (error) {
          if (error instanceof UserAlreadyExistsError) {
            return reply.status(409).send({ message: error.message })
          }
          throw error
        }
      
      },
  )
}