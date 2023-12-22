import { PRONOUN } from '../../domain/entities/enums/pronoun'

export interface IsValidPronounValidatorPort {
  validate: (value: PRONOUN) => boolean
}
