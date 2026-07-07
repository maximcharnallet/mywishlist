import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { loginRouteSchema, registerRouteSchema } from './auth.schema'
import { RegisterUseCase } from '@/auth/usecases/register.handler'
import { UserRepositoryImpl } from '@/auth/repositories/user.repository'
import { UserAlreadyExistsError } from '../errors/userAlreadyExistsError'
import { AuthUseCase } from '@/auth/usecases/auth.handler'
import { InvalidCredentialsError } from '../errors/invalidCredentialsError'


export async function authController(fastify: FastifyInstance) {
  fastify.log.debug('Registering auth controller routes')

  const userRepository = new UserRepositoryImpl(fastify)
  const registerUseCase = new RegisterUseCase(userRepository)
  const authUseCase = new AuthUseCase(userRepository, fastify.jwt)

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
  fastify.withTypeProvider<ZodTypeProvider>().post(
    '/login',
    {
      schema: loginRouteSchema
    },
    async (request, reply) => {
      try{
        const token = await authUseCase.execute(request.body.email, request.body.password)
        return reply.status(200).send({ token })
      } catch (error) {
        if (error instanceof InvalidCredentialsError) {
          return reply.status(401).send({ message: error.message })
        }
        throw error
      }
    }
  )
}