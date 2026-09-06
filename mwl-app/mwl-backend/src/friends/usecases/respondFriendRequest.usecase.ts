import type { FriendRequestRepository } from '@/friends/repositories/friendRequest.interface'
import { FriendRequestNotFoundError, NotAddresseeError } from '@/friends/errors/friendRequest.errors'

export class RespondFriendRequestUseCase {
  constructor(private friendRequestRepository: FriendRequestRepository) {}

  async execute(requestId: string, currentUserId: string, decision: 'accepted' | 'declined') {
    const request = await this.friendRequestRepository.findById(requestId)
    if (!request) throw new FriendRequestNotFoundError()

    if (request.addresseeId !== currentUserId) throw new NotAddresseeError()

    const updated = await this.friendRequestRepository.updateStatus(requestId, decision)
    if (!updated) throw new FriendRequestNotFoundError()

    return updated  
  }
}