import { RepliesContracts } from '../../../data/services/reply'
import { ok, serverError } from '../../helpers/http'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class ProcessReplyController implements Controller {
  constructor(private readonly replyService: RepliesContracts) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.replyService.process({
        phone: httpRequest.body.entry[0].changes[0].value.messages[0].from,
        name: httpRequest.body.entry[0].changes[0].value.contacts[0].profile
          .name,
        text: httpRequest.body.entry[0].changes[0].value.messages[0].text.body,
        timestamp:
          httpRequest.body.entry[0].changes[0].value.messages[0].timestamp
      })

      return ok()
    } catch (error) {
      return serverError(error)
    }
  }
}
