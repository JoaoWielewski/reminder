import { IsArrayEmptyValidatorPort } from '../../ports/validators/is-array-empty'

export class IsArrayEmptyValidatorAdapter implements IsArrayEmptyValidatorPort {
  validate(array: any[]): boolean {
    return array.length === 0
  }
}
