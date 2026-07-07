import { UserRepository } from '@/auth/repositories/user.interface'
import { JWT } from '@fastify/jwt'
import bcrypt from 'bcrypt'
import { InvalidCredentialsError } from '@/auth/errors/invalidCredentialsError'

export class AuthUseCase {
  constructor(
    private userRepository: UserRepository,
    private jwt: JWT
  ) {}
  public async execute(email: string, password: string) {
    if (!email || !password) {
      throw new InvalidCredentialsError()
    }
    const existingUser = await this.userRepository.findOne(email)
    if (!existingUser) {
      throw new InvalidCredentialsError()
    }
    const valid = await bcrypt.compare(password, existingUser.password)
    if (valid) {
            const token = this.jwt.sign({
                id: existingUser.id,
                name: existingUser.name,
            })

            return token
        }
    throw new InvalidCredentialsError()
  } 
}
