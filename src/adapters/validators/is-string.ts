import { IsStringValidatorPort } from '../../ports/validators/is-string'

export class IsStringValidatorAdapter implements IsStringValidatorPort {
  validate(value: any): boolean {
    return typeof value === 'string'
  }
}
