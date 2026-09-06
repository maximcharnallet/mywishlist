import type { User } from '@/auth/user.db.schema'
import type { UserDTO, PublicUser } from '@/auth/contracts/user.schema'

export function toUserDTO(user: User): UserDTO {
  const { password, updatedAt, ...rest } = user
  return rest
}

export function toPublicUser(user: User): PublicUser {
  const { email, ...rest } = toUserDTO(user)
  return rest
}