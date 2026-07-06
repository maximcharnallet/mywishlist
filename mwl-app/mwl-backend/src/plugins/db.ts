import fp from 'fastify-plugin'
import type { FastifyInstance } from 'fastify'
import { drizzle } from 'drizzle-orm/bun-sql'
import * as authSchema from '@/auth/user.db.schema'

const schema = { ...authSchema,
}

function createDb() {
  return drizzle(process.env.DATABASE_URL!, {
    schema,
  })
}

declare module 'fastify' {
  interface FastifyInstance {
    db: ReturnType<typeof createDb>
  }
}

export default fp(async function dbPlugin(app: FastifyInstance) {
  app.decorate('db', createDb())
  })
