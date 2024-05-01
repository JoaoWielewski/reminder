import { DbConnection } from '../../infra/db/knex'
import { CreateReplyDto } from '../../ports/repositories/dtos/reply/create-reply'
import { ReplyRepositoryPort } from '../../ports/repositories/reply-repository'

export class ReplyRepositoryAdapter implements ReplyRepositoryPort.Contracts {
  async create({
    id,
    phone,
    text,
    name,
    createdAt
  }: CreateReplyDto): Promise<void> {
    await DbConnection.getInstance()('reply').insert({
      id,
      phone,
      name,
      text,
      created_at: createdAt
    })
  }
}
