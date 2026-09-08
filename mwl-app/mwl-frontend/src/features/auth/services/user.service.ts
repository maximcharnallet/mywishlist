import type { SessionUser } from '@/features/auth/types/user.type'
import { authHeaders } from '@/shared/api/http'

export async function getMe(): Promise<SessionUser> {
  const res = await fetch('/api/users/me', { method: 'GET', headers: authHeaders() })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Une erreur est survenue')
  return data
}

export async function updateProfile(payload: { name?: string; avatarColor?: string }): Promise<SessionUser> {
  const res = await fetch('/api/users/me', {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Une erreur est survenue')
  return data
}