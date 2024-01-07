import { HttpRequest, HttpResponse } from '../../../presentation/protocols/http'
import { makeCountRemindersController } from '../../factories/controllers/reminder/count-reminders'
import { proxyRequest } from '../../proxy-request'

export const handler = async (
  event: HttpRequest,
  context: any
): Promise<HttpResponse> => {
  const controller = makeCountRemindersController()
  return proxyRequest(event, context, controller)
}
