import { drizzle } from 'drizzle-orm/bun-sql'
import * as authSchema from '@/auth/user.db.schema'
import * as giftSchema from '@/gifts/gift.db.schema'
import * as friendRequestSchema from '@/friends/friendRequest.db.schema'

const schema = { ...authSchema, ...giftSchema, ...friendRequestSchema }

export const db = drizzle(process.env.DATABASE_URL!, { schema })