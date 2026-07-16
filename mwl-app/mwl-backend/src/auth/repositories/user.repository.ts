import type { FastifyInstance } from 'fastify'
import { eq } from 'drizzle-orm'
import { users } from '@/auth/user.db.schema'
import type { NewUser, User } from '@/auth/user.db.schema'
import { UserRepository } from '@/auth/repositories/user.interface'


export class UserRepositoryImpl implements UserRepository {
  private db: FastifyInstance['db']

  constructor(app: FastifyInstance) {
    this.db = app.db
  }
  public async createUser(data: NewUser): Promise<User> {
    const [user] = await this.db.insert(users).values(data).returning()
    return user
  }

  public async findOne(email: string): Promise<User | undefined> {
    return await this.db.query.users.findFirst({ where: eq(users.email, email) })
  }

  public async findById(id: string): Promise<User | undefined> {
    return await this.db.query.users.findFirst({ where: eq(users.id, id) })
  }

  public async findMany(): Promise<User[]> {
    return await this.db.query.users.findMany()
  }

  public async update(id: string, data: Partial<NewUser>): Promise<User | undefined> {
    const [user] = await this.db
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning()
    return user
  }

  public async delete(id: string): Promise<boolean> {
    const result = await this.db
      .delete(users)
      .where(eq(users.id, id))
      .returning()
    return result.length > 0
  }
}