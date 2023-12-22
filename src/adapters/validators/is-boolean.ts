import { IsBooleanValidatorPort } from '../../ports/validators/is-boolean'

export class IsBooleanValidatorAdapter implements IsBooleanValidatorPort {
  validate(value: any): boolean {
    return typeof value === 'boolean'
  }
}
