import type { UserRepository } from '@/auth/repositories/user.interface'
import { UserNotFoundError } from '@/auth/errors/userNotFoundError'
import type { PublicUser } from '@/auth/contracts/user.schema'
import { toPublicUser } from '@/auth/services/user.mapper'

export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string): Promise<PublicUser> {
    const user = await this.userRepository.findById(userId)
    if (!user) {
      throw new UserNotFoundError()
    }

    const deleted = await this.userRepository.delete(userId)
    if (!deleted) {
      throw new UserNotFoundError()
    }

    return toPublicUser(user)
  }
}