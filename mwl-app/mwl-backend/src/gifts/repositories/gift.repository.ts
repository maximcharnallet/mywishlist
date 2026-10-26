import { GiftRepository } from '@/gifts/repositories/gift.interface'
import { FastifyInstance } from 'fastify'
import { and, desc, eq, isNull } from 'drizzle-orm'
import type { NewGift, Gift } from '@/gifts/gift.db.schema'
import { gifts } from '@/gifts/gift.db.schema'

export class GiftRepositoryImpl implements GiftRepository  {
  private db: FastifyInstance['db']

  constructor(app: FastifyInstance) {
    this.db = app.db
  }

  public async createGift(data: NewGift): Promise<Gift> {
    const [gift] = await this.db.insert(gifts).values(data).returning()
    return gift
  }

  public async findOne(id: string, userId: string): Promise<Gift | undefined>{
    return await this.db.query.gifts.findFirst({
      where: and(
        eq(gifts.id, id),
        eq(gifts.userId, userId)
      ),
    })  
  }

  public async findMany(userId: string): Promise<Gift[]> {
    return await this.db.query.gifts.findMany({
      where: eq(gifts.userId, userId),
      orderBy: desc(gifts.createdAt),
    })
  }

  public async update(id: string, userId: string, data: Partial<NewGift>): Promise<Gift | undefined> {
    const [gift] = await this.db
      .update(gifts)
      .set({ ...data, updatedAt: new Date() })
      .where(and(eq(gifts.id, id), eq(gifts.userId, userId)))
      .returning()
    return gift
  }

  public async delete(id: string, userId: string): Promise<boolean> {
    const result = await this.db
      .delete(gifts)
      .where(and(eq(gifts.id, id), eq(gifts.userId, userId)))
      .returning()
    return result.length > 0
  }

  public async reserve(id: string, reservedBy: string): Promise<Gift | undefined> {
    const [gift] = await this.db
      .update(gifts)
      .set({ reservedBy })
      .where(and(eq(gifts.id, id), isNull(gifts.reservedBy)))
      .returning()
    return gift
  }

  public async unreserve(id: string, reservedBy: string): Promise<boolean> {
    const result = await this.db
      .update(gifts)
      .set({ reservedBy: null })
      .where(and(eq(gifts.id, id), eq(gifts.reservedBy, reservedBy)))
      .returning()
    return result.length > 0
  }

}