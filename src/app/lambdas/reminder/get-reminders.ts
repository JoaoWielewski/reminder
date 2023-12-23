import { HttpRequest, HttpResponse } from '../../../presentation/protocols/http'
import { makeGetRemindersController } from '../../factories/controllers/reminder/get-reminders'
import { proxyRequest } from '../../proxy-request'

export const handler = async (
  event: HttpRequest,
  context: any
): Promise<HttpResponse> => {
  const controller = makeGetRemindersController()
  return proxyRequest(event, context, controller)
}
