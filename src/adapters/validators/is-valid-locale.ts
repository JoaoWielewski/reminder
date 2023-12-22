import { PRONOUN } from '../../domain/entities/enums/pronoun'
import { IsValidPronounValidatorPort } from '../../ports/validators/is-valid-pronoun'

export class IsValidPronounValidatorAdapter
  implements IsValidPronounValidatorPort
{
  validate(value: PRONOUN): boolean {
    return Object.values(PRONOUN).includes(value)
  }
}
