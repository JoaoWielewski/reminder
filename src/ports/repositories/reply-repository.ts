import { CreateReplyDto } from './dtos/reply/create-reply'

export namespace ReplyRepositoryPort {
  export interface Contracts {
    create(input: CreateReplyDto): Promise<void>
  }
}
