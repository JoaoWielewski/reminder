import { GenerateIdPort } from '../../ports/crypto/generate-id'
import { ReplyRepositoryPort } from '../../ports/repositories/reply-repository'
import { ProcessReplyCase } from '../../ports/usecases/reply/process-reply'

export type RepliesContracts = ProcessReplyCase.Contract

export class ReplyService implements RepliesContracts {
  constructor(
    private readonly replyRepository: ReplyRepositoryPort.Contracts,
    private readonly generateId: GenerateIdPort
  ) {}

  async process({
    phone,
    name,
    text,
    timestamp
  }: ProcessReplyCase.Input): Promise<ProcessReplyCase.Output> {
    await this.replyRepository.create({
      id: this.generateId.generate(),
      phone,
      name,
      text,
      createdAt: new Date(parseInt(timestamp) * 1000)
    })
  }
}
