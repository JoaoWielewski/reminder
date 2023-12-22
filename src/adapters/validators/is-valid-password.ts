import { IsValidPasswordValidatorPort } from '../../ports/validators/is-valid-password'

export class IsValidPasswordValidatorAdapter
  implements IsValidPasswordValidatorPort
{
  validate(value: string): boolean {
    const passwordRegex =
      /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+)(?=.*[A-Z]+)(?=.*[a-z]+).*$/

    return passwordRegex.test(value)
  }
}
