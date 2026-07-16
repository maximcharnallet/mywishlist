import fp from 'fastify-plugin'
import type { FastifyInstance } from 'fastify'
import { db } from '@/database/schema.db' 

declare module 'fastify' {
  interface FastifyInstance {
    db: typeof db
  }
}

export default fp(async function dbPlugin(app: FastifyInstance) {
  app.decorate('db', db)
})