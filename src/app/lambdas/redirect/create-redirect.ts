import { HttpRequest, HttpResponse } from '../../../presentation/protocols/http'
import { makeCreateRedirectController } from '../../factories/controllers/redirect/create-redirect'
import { proxyRequest } from '../../proxy-request'

export const handler = async (
  event: HttpRequest,
  context: any
): Promise<HttpResponse> => {
  const controller = makeCreateRedirectController()
  return proxyRequest(event, context, controller)
}
