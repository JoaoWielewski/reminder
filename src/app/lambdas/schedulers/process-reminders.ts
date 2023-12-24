import { HttpResponse } from '../../../presentation/protocols/http'
import { makeProcessRemindersScheduler } from '../../factories/schedulers/process-reminders'
import { proxyRequest } from '../../proxy-request'

export const handler = async (
  event: any,
  context: any
): Promise<HttpResponse> => {
  const scheduler = makeProcessRemindersScheduler()
  return proxyRequest(event, context, scheduler)
}
