import { pgTable, uuid, timestamp, pgEnum, unique } from 'drizzle-orm/pg-core'
import { users } from '@/auth/user.db.schema'

export const friendRequestStatusEnum = pgEnum('friend_request_status', ['pending', 'accepted', 'declined'])

export const friendRequests = pgTable('friend_requests', {
  id: uuid('id').defaultRandom().primaryKey(),
  requesterId: uuid('requester_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  addresseeId: uuid('addressee_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  status: friendRequestStatusEnum('status').notNull().default('pending'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  uniquePair: unique().on(table.requesterId, table.addresseeId),
}))

export type FriendRequestRow = typeof friendRequests.$inferSelect
export type NewFriendRequestRow = typeof friendRequests.$inferInsert