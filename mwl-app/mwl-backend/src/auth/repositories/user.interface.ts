import type { NewUser, User } from '@/auth/user.db.schema'

export interface UserRepository {
  createUser(data: NewUser): Promise<User>
  findOne(email: string): Promise<User | undefined>
  findById(id: string): Promise<User | undefined>
  findMany(): Promise<User[]>
}