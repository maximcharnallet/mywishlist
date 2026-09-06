import type { UserRepository } from '@/auth/repositories/user.interface'
import type { FriendRequestRepository } from '@/friends/repositories/friendRequest.interface'
import { CannotFriendYourselfError, FriendRequestAlreadyExistsError } from '@/friends/errors/friendRequest.errors'
import { UserNotFoundError } from '@/auth/errors/userNotFoundError'

export class SendFriendRequestUseCase {
  constructor(
    private userRepository: UserRepository,
    private friendRequestRepository: FriendRequestRepository,
  ) {}

  async execute(requesterId: string, addresseeEmail: string) {
    const addressee = await this.userRepository.findOne(addresseeEmail)
    if (!addressee) throw new UserNotFoundError()

    if (addressee.id === requesterId) throw new CannotFriendYourselfError()

    const existing = await this.friendRequestRepository.findBetween(requesterId, addressee.id)
    if (existing && existing.status !== 'declined') {
      throw new FriendRequestAlreadyExistsError()
    }

    return await this.friendRequestRepository.create({
      requesterId,
      addresseeId: addressee.id,
      status: 'pending',
    })
  }
}