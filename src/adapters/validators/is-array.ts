import { IsArrayValidatorPort } from '../../ports/validators/is-array'

export class IsArrayValidatorAdapter implements IsArrayValidatorPort {
  validate(value: any, expectedType?: string): boolean {
    if (expectedType) {
      return (
        Array.isArray(value) &&
        value.every((item: any) => typeof item === expectedType)
      )
    }
    return Array.isArray(value)
  }
}
