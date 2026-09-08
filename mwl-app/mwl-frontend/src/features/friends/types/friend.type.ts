export type FriendRequestStatus = 'pending' | 'accepted' | 'declined'

export interface FriendRequest {
  id: string
  requesterId: string
  addresseeId: string
  status: FriendRequestStatus
  createdAt: string
  updatedAt: string
}

export interface Friend {
  id: string
  name: string
  avatarColor: string 
  createdAt: string
}

export interface PendingFriendRequest {
  id: string
  requester: Friend
  createdAt: string
}