import { HttpRequest, HttpResponse } from '../../../presentation/protocols/http'
import { makeCreateDoctorController } from '../../factories/controllers/doctor/create-doctor'
import { proxyRequest } from '../../proxy-request'

export const handler = async (
  event: HttpRequest,
  context: any
): Promise<HttpResponse> => {
  const controller = makeCreateDoctorController()
  return proxyRequest(event, context, controller)
}
