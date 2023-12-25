import { HttpRequest, HttpResponse } from '../../../presentation/protocols/http'
import { makeLoginController } from '../../factories/controllers/doctor/login'
import { proxyRequest } from '../../proxy-request'

export const handler = async (
  event: HttpRequest,
  context: any
): Promise<HttpResponse> => {
  const controller = makeLoginController()
  return proxyRequest(event, context, controller)
}
