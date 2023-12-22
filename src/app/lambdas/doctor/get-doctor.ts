import { HttpRequest, HttpResponse } from '../../../presentation/protocols/http'
import { makeGetDoctorController } from '../../factories/controllers/doctor/get-doctor'
import { proxyRequest } from '../../proxy-request'

export const handler = async (
  event: HttpRequest,
  context: any
): Promise<HttpResponse> => {
  const controller = makeGetDoctorController()
  return proxyRequest(event, context, controller)
}
