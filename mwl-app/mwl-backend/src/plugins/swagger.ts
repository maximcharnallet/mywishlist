import fp from 'fastify-plugin'
import type { FastifyInstance } from 'fastify'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import { jsonSchemaTransform } from 'fastify-type-provider-zod'

export default fp(async function swaggerPlugin(app: FastifyInstance) {
  app.register(swagger, {
    openapi: {
      info: {
        title: 'MyWishlist API',
        description: 'API documentation for MyWishlist',
        version: '1.0.0',
      },
    },
    transform: jsonSchemaTransform,
  })
  app.register(swaggerUi, {
    routePrefix: '/docs',
  })
})