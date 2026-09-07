import { AppError } from '@/shared/errors/app-error'

export class CannotFriendYourselfError extends AppError {
  constructor() { super("Vous ne pouvez pas vous ajouter vous-même", 400) }
}
export class FriendRequestAlreadyExistsError extends AppError {
  constructor() { super("Une demande existe déjà entre ces deux utilisateurs", 409) }
}
export class FriendRequestNotFoundError extends AppError {
  constructor() { super("Demande d'ami introuvable", 404) }
}
export class NotAddresseeError extends AppError {
  constructor() { super("Seul le destinataire peut répondre à cette demande", 403) }
}
export class NotFriendError extends AppError {
  constructor() { super("Cet utilisateur ne fait pas partie de vos amis.", 403) }
}