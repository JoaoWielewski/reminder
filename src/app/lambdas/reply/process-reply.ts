import { HttpRequest, HttpResponse } from '../../../presentation/protocols/http'
import { makeProcessReplyController } from '../../factories/controllers/reply/process-reply'
import { proxyRequest } from '../../proxy-request'

export const handler = async (
  event: HttpRequest,
  context: any
): Promise<HttpResponse> => {
  const controller = makeProcessReplyController()
  return proxyRequest(event, context, controller)
}
