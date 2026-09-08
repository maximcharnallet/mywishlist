import { UserRepository } from '@/auth/repositories/user.interface'
import { UserNotFoundError } from '@/auth/errors/userNotFoundError'
import { PublicUser } from '@/auth/contracts/user.schema'

export class GetMeUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string): Promise<PublicUser> {
    const user = await this.userRepository.findById(userId)
    if (!user) throw new UserNotFoundError()
    const { password, email, updatedAt, ...publicUser } = user
    return publicUser
  }
}