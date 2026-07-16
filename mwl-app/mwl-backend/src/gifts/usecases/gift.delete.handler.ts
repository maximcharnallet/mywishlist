import type { GiftRepository } from '@/gifts/repositories/gift.interface'

export class DeleteGiftUsecase {
  private giftRepository: GiftRepository
  constructor(giftRepository: GiftRepository) {
    this.giftRepository = giftRepository
  }

  public async execute(id: string, userId: string): Promise<boolean> {
    return await this.giftRepository.delete(id, userId)
  }
}