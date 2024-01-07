import { HttpRequest, HttpResponse } from '../../../presentation/protocols/http'
import { makeSearchRemindersController } from '../../factories/controllers/reminder/search-reminders'
import { proxyRequest } from '../../proxy-request'

export const handler = async (
  event: HttpRequest,
  context: any
): Promise<HttpResponse> => {
  const controller = makeSearchRemindersController()
  return proxyRequest(event, context, controller)
}
