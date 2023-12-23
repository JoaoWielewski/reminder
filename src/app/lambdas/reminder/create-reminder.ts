import { HttpRequest, HttpResponse } from '../../../presentation/protocols/http'
import { makeCreateReminderController } from '../../factories/controllers/reminder/create-reminder'
import { proxyRequest } from '../../proxy-request'

export const handler = async (
  event: HttpRequest,
  context: any
): Promise<HttpResponse> => {
  const controller = makeCreateReminderController()
  return proxyRequest(event, context, controller)
}
