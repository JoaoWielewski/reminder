import { HttpRequest, HttpResponse } from '../../../presentation/protocols/http'
import { makeDeleteReminderController } from '../../factories/controllers/reminder/delete-reminder'
import { proxyRequest } from '../../proxy-request'

export const handler = async (
  event: HttpRequest,
  context: any
): Promise<HttpResponse> => {
  const controller = makeDeleteReminderController()
  return proxyRequest(event, context, controller)
}
