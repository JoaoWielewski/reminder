import { HttpRequest, HttpResponse } from '../../../presentation/protocols/http'
import { makeGetDoctorByEmailController } from '../../factories/controllers/doctor/get-doctor-by-email'
import { proxyRequest } from '../../proxy-request'

export const handler = async (
  event: HttpRequest,
  context: any
): Promise<HttpResponse> => {
  const controller = makeGetDoctorByEmailController()
  return proxyRequest(event, context, controller)
}
