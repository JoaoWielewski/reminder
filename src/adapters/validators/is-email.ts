import isEmail from 'validator/lib/isEmail'
import { IsEmailValidatorPort } from '../../ports/validators/is-email'

export class IsEmailValidatorAdapter implements IsEmailValidatorPort {
  validate(value: string): boolean {
    return isEmail(value)
  }
}
