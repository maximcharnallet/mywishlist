import type { GiftRepository } from '@/gifts/repositories/gift.interface'
import type { Gift, NewGift } from '@/gifts/gift.db.schema'

export class UpdateGiftUsecase {
  private giftRepository: GiftRepository
  constructor(giftRepository: GiftRepository) {
    this.giftRepository = giftRepository
  }

  public async execute(
    id: string,
    userId: string,
    data: Partial<NewGift>
  ): Promise<Gift | undefined> {
    return await this.giftRepository.update(id, userId, data)
  }
}