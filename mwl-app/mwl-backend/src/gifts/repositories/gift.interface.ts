import type { NewGift, Gift } from '@/gifts/gift.db.schema'

export interface GiftRepository {
  createGift(data: NewGift): Promise<Gift>
  findOne(id: string, userId: string): Promise<Gift | undefined>
  findMany(userId: string): Promise<Gift[]>
  update(id:string, userId:string, data: Partial<NewGift>): Promise<Gift | undefined>
  delete(id: string, userId: string): Promise<boolean>
}