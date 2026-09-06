// friends/usecases/listFriends.usecase.ts
import type { UserRepository } from '@/auth/repositories/user.interface'
import type { FriendRequestRepository } from '@/friends/repositories/friendRequest.interface'
import { toPublicUser } from '@/auth/services/user.mapper'
import type { PublicUser } from '@/auth/contracts/user.schema'

export class ListFriendsUseCase {
  constructor(
    private userRepository: UserRepository,
    private friendRequestRepository: FriendRequestRepository,
  ) {}

  async execute(userId: string): Promise<PublicUser[]> {
    const accepted = await this.friendRequestRepository.findAcceptedForUser(userId)

    const friendIds = accepted.map((r) => (r.requesterId === userId ? r.addresseeId : r.requesterId))

    const friends = await Promise.all(friendIds.map((id) => this.userRepository.findById(id)))

    return friends.filter((u): u is NonNullable<typeof u> => !!u).map(toPublicUser)
  }
}