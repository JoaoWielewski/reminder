import { Redirect } from '../../domain/entities/redirect'
import { GenerateIdPort } from '../../ports/crypto/generate-id'
import { RedirectRepositoryPort } from '../../ports/repositories/redirect-repository'
import { CreateRedirectCase } from '../../ports/usecases/redirect/create-redirect'

export type RedirectContracts = CreateRedirectCase.Contract

export class RedirectService implements RedirectContracts {
  constructor(
    private readonly redirectRepository: RedirectRepositoryPort.Contracts,
    private readonly generateId: GenerateIdPort
  ) {}

  async create({
    reminderId
  }: CreateRedirectCase.Input): Promise<CreateRedirectCase.Output> {
    const redirect = new Redirect({
      id: this.generateId.generate(),
      reminderId,
      createdAt: new Date()
    })

    await this.redirectRepository.create(redirect)
  }
}
