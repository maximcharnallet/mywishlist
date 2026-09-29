import { AppError } from '@/shared/errors/app-error'

export class UserAlreadyExistsError extends AppError {
  constructor() { super("Un utilisateur existe déjà avec cet email", 409) }
}