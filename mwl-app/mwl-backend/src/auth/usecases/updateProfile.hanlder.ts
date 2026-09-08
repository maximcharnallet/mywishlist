import { UserRepository } from '@/auth/repositories/user.interface'
import { UserNotFoundError } from '@/auth/errors/userNotFoundError'
import { PublicUser } from '@/auth/contracts/user.schema'


export class UpdateProfileUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string, data: { name?: string; avatarColor?: string }): Promise<PublicUser> {
    const updated = await this.userRepository.update(userId, data)
    if (!updated) throw new UserNotFoundError()
    const { password, email, updatedAt, ...publicUser } = updated
    return publicUser
  }
}