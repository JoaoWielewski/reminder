import { Redirect } from '../../domain/entities/redirect'

export namespace RedirectRepositoryPort {
  export interface Contracts {
    create(input: Redirect): Promise<void>
  }
}
