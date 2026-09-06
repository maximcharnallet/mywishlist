import type { UserRepository } from '@/auth/repositories/user.interface'
import type { FriendRequestRepository } from '@/friends/repositories/friendRequest.interface'
import { toPublicUser } from '@/auth/services/user.mapper'
import type { PublicUser } from '@/auth/contracts/user.schema'

export interface PendingFriendRequestView {
  id: string
  requester: PublicUser
  createdAt: Date
}

export class ListPendingFriendRequestsUseCase {
  constructor(
    private userRepository: UserRepository,
    private friendRequestRepository: FriendRequestRepository,
  ) {}

  async execute(userId: string): Promise<PendingFriendRequestView[]> {
    const pending = await this.friendRequestRepository.findPendingReceivedBy(userId)

    const results = await Promise.all(
      pending.map(async (request) => {
        const requester = await this.userRepository.findById(request.requesterId)
        if (!requester) return null
        return {
          id: request.id,
          requester: toPublicUser(requester),
          createdAt: request.createdAt,
        }
      }),
    )

    return results.filter((r): r is PendingFriendRequestView => !!r)
  }
}