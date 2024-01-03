import { GenerateIdAdapter } from '../../../adapters/crypto/generate-id'
import { RedirectRepositoryAdapter } from '../../../adapters/repositories/redirect-repository'
import { RedirectService } from '../../../data/services/redirect'

export const makeRedirectService = (): RedirectService => {
  return new RedirectService(
    new RedirectRepositoryAdapter(),
    new GenerateIdAdapter()
  )
}
