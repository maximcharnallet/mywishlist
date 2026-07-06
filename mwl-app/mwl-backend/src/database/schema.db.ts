import { drizzle } from 'drizzle-orm/bun-sql'
import * as authSchema from '@/auth/user.db.schema'

export const db = drizzle(process.env.DATABASE_URL!, {
  schema: {
    auth: authSchema,
  },
})