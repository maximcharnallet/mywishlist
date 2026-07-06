import bcrypt from 'bcrypt'
import type { UserRepository } from '@/auth/repositories/user.interface'
import type { RegisterInput } from '@/auth/contracts/register.schema'
import { UserAlreadyExistsError } from '@/auth/errors/userAlreadyExistsError'

export class RegisterUseCase {
  constructor(private userRepository: UserRepository) {}

  public async execute(input: RegisterInput) {
    const existingUser = await this.userRepository.findOne(input.email)
    if (existingUser) {
      throw new UserAlreadyExistsError()
    }
    const hashedPassword = await bcrypt.hash(input.password, 10)
    const user = await this.userRepository.createUser({
      name: input.name,
      email: input.email,
      password: hashedPassword,
    })
    const { password, ...safeUser } = user
    return safeUser
  }
}