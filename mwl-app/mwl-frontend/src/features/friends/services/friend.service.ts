import type { FriendRequest, Friend, PendingFriendRequest } from '@/features/friends/types/friend.type'
import type { Gift } from '@/features/gifts/types/gift.type'
import { authHeaders } from '@/shared/api/http'

export async function sendFriendRequest(addresseeEmail: string): Promise<FriendRequest> {
  const res = await fetch('/api/friends', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({
      addresseeEmail,
    }),
  })
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.message || 'Une erreur est survenue')
  }
  return data
}

export async function respondFriendRequest(
  id: string,
  decision: 'accepted' | 'declined',
): Promise<FriendRequest> {
  const res = await fetch(`/api/friends/${id}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({
      decision,
    }),
  })
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.message || 'Une erreur est survenue')
  }
  return data
}

export async function getAllFriends(): Promise<Friend[]> {
  const res = await fetch('/api/friends', {
    method: 'GET',
    headers: authHeaders(),
  })
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.message || 'Une erreur est survenue')
  }
  return data
}

export async function getPendingFriendRequests(): Promise<PendingFriendRequest[]> {
  const res = await fetch('/api/friends/pending', {
    method: 'GET',
    headers: authHeaders(),
  })
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.message || 'Une erreur est survenue')
  }
  return data
}

export async function getFriendGifts(friendId: string): Promise<Gift[]> {
  const res = await fetch(`/api/friends/${friendId}/gifts`, {
    method: 'GET',
    headers: authHeaders(),
  })
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.message || 'Une erreur est survenue')
  }
  return data
}