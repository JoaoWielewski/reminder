import { IsIntegerValidatorPort } from '../../ports/validators/is-integer'
import isInt from 'validator/lib/isInt'

export class IsIntegerValidatorAdapter implements IsIntegerValidatorPort {
  validate(value: any): boolean {
    return isInt(value.toString())
  }
}
