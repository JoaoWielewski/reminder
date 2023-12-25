import jwt from 'jsonwebtoken'
import { Environment } from '../../app/env'
import { IsValidTokenValidatorPort } from '../../ports/validators/is-valid-token'

export class IsValidTokenValidatorAdapter implements IsValidTokenValidatorPort {
  validate(token: string): string | null {
    try {
      const decodedToken = jwt.verify(
        token.split(' ')[1],
        Environment.ACCESS_TOKEN_SECRET
      ) as any
      return decodedToken.id
    } catch (error) {
      return null
    }
  }
}
