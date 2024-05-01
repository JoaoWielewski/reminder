import { GenerateIdAdapter } from '../../../adapters/crypto/generate-id'
import { ReplyRepositoryAdapter } from '../../../adapters/repositories/reply-repository'
import { ReplyService } from '../../../data/services/reply'

export const makeReplyService = (): ReplyService => {
  return new ReplyService(new ReplyRepositoryAdapter(), new GenerateIdAdapter())
}
