import { IsStringValidatorAdapter } from '../../../../adapters/validators/is-string'
import { CreateRedirectController } from '../../../../presentation/controllers/redirect/create-redirect'
import { makeRedirectService } from '../../services/redirect'

export const makeCreateRedirectController = (): CreateRedirectController => {
  return new CreateRedirectController(
    makeRedirectService(),
    new IsStringValidatorAdapter()
  )
}
