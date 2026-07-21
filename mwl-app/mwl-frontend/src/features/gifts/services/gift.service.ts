import type { Gift } from '@/features/gifts/types/gift.type'
import { authHeaders } from '@/shared/api/http'

export async function createGift(title: string, description?: string, price?: number): Promise<Gift> {
  const res = await fetch('/api/gifts', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({
      title,
      description,
      price,
    }),
  })
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.message || 'Une erreur est survenue')
  }
  return data
}

export async function getAllGifts(): Promise<Gift[]> {
  const res = await fetch('/api/gifts', {
    method: 'GET',
    headers: authHeaders(),
  })
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.message || 'Une erreur est survenue')
  }
  return data
}

export async function updateGift(id: string, titre?: string, description?: string, price?: number): Promise<Gift> {
  const res = await fetch(`/api/gifts/${id}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({
      titre,
      description,
      price,
    }),
  })
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.message || 'Une erreur est survenue')
  }
  return data
}

export async function deleteGift(id: string): Promise<void> {
  const res = await fetch(`/api/gifts/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.message || 'Une erreur est survenue')
  }
}