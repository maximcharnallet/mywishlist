import { AppError } from '@/shared/errors/app-error'

export class GiftNotFoundError extends AppError {
  constructor() { super("Cadeau introuvable", 404) }
}
export class GiftAlreadyReservedError extends AppError {
  constructor() { super("Ce cadeau est déjà réservé", 409) }
}