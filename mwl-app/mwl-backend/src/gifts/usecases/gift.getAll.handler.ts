import type { GiftRepository } from '@/gifts/repositories/gift.interface'
import type { Gift } from '@/gifts/gift.db.schema'


export class GetAllGiftsUsecase { 
  private giftRepository : GiftRepository
  constructor(giftRepository: GiftRepository) {
    this.giftRepository = giftRepository
  }

  public async execute(userId: string): Promise<Gift[]> {
    return await this.giftRepository.findMany(userId)
  }
}