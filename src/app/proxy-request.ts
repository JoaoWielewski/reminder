import { Controller } from '../presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '../presentation/protocols/http'
import { Logger } from './helpers/logger'
import { adaptToRequest } from './protocols/adapt-to-request'

export const proxyRequest = async (
  event: HttpRequest,
  context: any,
  controller: Controller | any,
  type?: string
): Promise<HttpResponse> => {
  const correlationId = context.awsRequestId
  Logger.setInternalContext(context.functionName, correlationId)
  const request = adaptToRequest(event)
  Logger.log({ request, event, type })
  const response = await controller.handle(
    type === 'sqs'
      ? event
      : {
          correlationId,
          ...request
        }
  )
  Logger.log(response)
  return response
}
