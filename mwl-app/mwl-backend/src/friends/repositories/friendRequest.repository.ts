import type { FastifyInstance } from 'fastify'
import { and, eq, or } from 'drizzle-orm'
import { friendRequests } from '@/friends/friendRequest.db.schema'
import type { FriendRequestRow, NewFriendRequestRow } from '@/friends/friendRequest.db.schema'
import { FriendRequestRepository } from '@/friends/repositories/friendRequest.interface'

export class FriendRequestRepositoryImpl implements FriendRequestRepository {
  private db: FastifyInstance['db']

  constructor(app: FastifyInstance) {
    this.db = app.db
  }

  public async create(data: NewFriendRequestRow): Promise<FriendRequestRow> {
    const [request] = await this.db.insert(friendRequests).values(data).returning()
    return request
  }

  public async findById(id: string): Promise<FriendRequestRow | undefined> {
    return await this.db.query.friendRequests.findFirst({ where: eq(friendRequests.id, id) })
  }

  public async findBetween(userAId: string, userBId: string): Promise<FriendRequestRow | undefined> {
    return await this.db.query.friendRequests.findFirst({
      where: or(
        and(eq(friendRequests.requesterId, userAId), eq(friendRequests.addresseeId, userBId)),
        and(eq(friendRequests.requesterId, userBId), eq(friendRequests.addresseeId, userAId)),
      ),
    })
  }

  public async updateStatus(id: string, status: 'accepted' | 'declined'): Promise<FriendRequestRow | undefined> {
    const [request] = await this.db
      .update(friendRequests)
      .set({ status, updatedAt: new Date() })
      .where(eq(friendRequests.id, id))
      .returning()
    return request
  }

  public async findPendingReceivedBy(userId: string): Promise<FriendRequestRow[]> {
    return await this.db.query.friendRequests.findMany({
      where: and(eq(friendRequests.addresseeId, userId), eq(friendRequests.status, 'pending')),
    })
  }

  public async findAcceptedForUser(userId: string): Promise<FriendRequestRow[]> {
    return await this.db.query.friendRequests.findMany({
      where: and(
        or(eq(friendRequests.requesterId, userId), eq(friendRequests.addresseeId, userId)),
        eq(friendRequests.status, 'accepted'),
      ),
    })
  }

  public async areFriends(userAId: string, userBId: string): Promise<boolean> {
    const request = await this.findBetween(userAId, userBId)
    return request?.status === 'accepted'
  }
}