import { HttpResponse } from '../../../presentation/protocols/http'
import { makeResetRemindersScheduler } from '../../factories/schedulers/reset-reminders'
import { proxyRequest } from '../../proxy-request'

export const handler = async (
  event: any,
  context: any
): Promise<HttpResponse> => {
  const scheduler = makeResetRemindersScheduler()
  return proxyRequest(event, context, scheduler)
}
