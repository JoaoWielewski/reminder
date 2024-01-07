import { Redirect } from '../../domain/entities/redirect'
import { DbConnection } from '../../infra/db/knex'
import { RedirectRepositoryPort } from '../../ports/repositories/redirect-repository'

export class RedirectRepositoryAdapter
  implements RedirectRepositoryPort.Contracts
{
  async create({ id, reminderId, createdAt }: Redirect): Promise<void> {
    await DbConnection.getInstance()('redirect').insert({
      id,
      reminder_id: reminderId,
      created_at: createdAt
    })
  }
}
