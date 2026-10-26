import type { GiftRepository } from '@/gifts/repositories/gift.interface'
import type { FriendRequestRepository } from '@/friends/repositories/friendRequest.interface'
import { NotFriendError } from '@/friends/errors/friendRequest.errors'
import { GiftNotFoundError, GiftAlreadyReservedError } from '@/gifts/errors/gift.errors'


export class ReserveGiftUsecase {
  private giftRepository: GiftRepository
  private friendRequestRepository: FriendRequestRepository

  constructor(giftRepository: GiftRepository, friendRequestRepository: FriendRequestRepository) {
    this.giftRepository = giftRepository
    this.friendRequestRepository = friendRequestRepository
  }

  public async execute(giftId: string, friendId: string, userId: string): Promise<void> {
    if (!(await this.friendRequestRepository.areFriends(userId, friendId))) throw new NotFriendError()

    const gift = await this.giftRepository.findOne(giftId, friendId)
    if (!gift) throw new GiftNotFoundError()

    const reserved = await this.giftRepository.reserve(giftId, userId)
    if (!reserved) throw new GiftAlreadyReservedError()
  }
}