import type { GiftRepository } from '@/gifts/repositories/gift.interface'
import { GiftNotFoundError } from '@/gifts/errors/gift.errors'

export class UnreserveGiftUsecase {
  private giftRepository: GiftRepository

  constructor(giftRepository: GiftRepository) {
    this.giftRepository = giftRepository
  }

  public async execute(giftId: string, userId: string): Promise<void> {
    const done = await this.giftRepository.unreserve(giftId, userId)
    if (!done) throw new GiftNotFoundError()
  }
}