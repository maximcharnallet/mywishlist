import { FriendRequestRepository } from '@/friends/repositories/friendRequest.interface'
import { GiftRepository } from '@/gifts/repositories/gift.interface'
import { Gift } from '@/gifts/contracts/gift.schema'
import { NotFriendError } from '@/friends/errors/friendRequest.errors'

export class GetFriendGiftsUseCase {
  constructor(
    private friendRequestRepository: FriendRequestRepository,
    private giftRepository: GiftRepository
  ) {}

  async execute(userId: string, friendId: string): Promise<Gift[]> {
    const isFriend = await this.friendRequestRepository.areFriends(userId, friendId)

    if (!isFriend) {
      throw new NotFriendError()
    }

    const dbGifts = await this.giftRepository.findMany(friendId)

    return dbGifts.map((gift) => ({
      id: gift.id,
      title: gift.title,
      userId: gift.userId,
      createdAt: gift.createdAt,
      description: gift.description ?? undefined,
      price: gift.price ?? undefined,
    }))
  }
}