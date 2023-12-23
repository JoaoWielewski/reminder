import { HttpRequest, HttpResponse } from '../../../presentation/protocols/http'
import { makeUpdateDoctorController } from '../../factories/controllers/doctor/update-doctor'
import { proxyRequest } from '../../proxy-request'

export const handler = async (
  event: HttpRequest,
  context: any
): Promise<HttpResponse> => {
  const controller = makeUpdateDoctorController()
  return proxyRequest(event, context, controller)
}
