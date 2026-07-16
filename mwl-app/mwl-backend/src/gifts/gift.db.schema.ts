import { pgTable, uuid, varchar, text, integer, timestamp } from 'drizzle-orm/pg-core'
import { users } from '@/auth/user.db.schema'

export const gifts = pgTable('gifts', {
  id: uuid('id').defaultRandom().primaryKey(),
  titre: varchar('titre', { length: 255 }).notNull(),
  description: text('description'),
  price: integer('price'),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export type Gift = typeof gifts.$inferSelect
export type NewGift = typeof gifts.$inferInsert
