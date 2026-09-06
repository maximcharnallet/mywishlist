import type { FriendRequestRow, NewFriendRequestRow } from '@/friends/friendRequest.db.schema'

export interface FriendRequestRepository {
  create(data: NewFriendRequestRow): Promise<FriendRequestRow>
  findById(id: string): Promise<FriendRequestRow | undefined>
  findBetween(userAId: string, userBId: string): Promise<FriendRequestRow | undefined>
  updateStatus(id: string, status: 'accepted' | 'declined'): Promise<FriendRequestRow | undefined>
  findPendingReceivedBy(userId: string): Promise<FriendRequestRow[]>
  findAcceptedForUser(userId: string): Promise<FriendRequestRow[]>
  areFriends(userAId: string, userBId: string): Promise<boolean>
}