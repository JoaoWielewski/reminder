import { ProcessReplyController } from '../../../../presentation/controllers/reply/process-reply'
import { makeReplyService } from '../../services/reply'

export const makeProcessReplyController = (): ProcessReplyController => {
  return new ProcessReplyController(makeReplyService())
}
