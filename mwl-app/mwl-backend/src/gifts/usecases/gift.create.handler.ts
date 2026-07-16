import type { GiftRepository } from '@/gifts/repositories/gift.interface'
import type { Gift } from '@/gifts/gift.db.schema'
import type { GiftInput } from '@/gifts/contracts/gitf.input.schema'

type CreateGiftParams = GiftInput & { userId: string }

export class CreateGiftUsecase {
  private giftRepository : GiftRepository
  constructor(giftRepository: GiftRepository){
    this.giftRepository = giftRepository
  }

  public async execute({ userId, titre, description, price }: CreateGiftParams): Promise<Gift> {
    return await this.giftRepository.createGift({ userId, titre, description, price })
  }
}