import { DoctorContracts } from '../../../data/services/doctor'
import { IsStringValidatorPort } from '../../../ports/validators/is-string'
import { IsValidTokenValidatorPort } from '../../../ports/validators/is-valid-token'
import { InvalidParamError } from '../../errors/invalid-param'
import { MissingParamError } from '../../errors/missing-param'
import { NotFoundError } from '../../errors/not-found'
import { UnauthorizedError } from '../../errors/unauthorized'
import {
  badRequest,
  notFound,
  ok,
  serverError,
  unauthorized
} from '../../helpers/http'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class GetDoctorController implements Controller {
  constructor(
    private readonly doctorService: DoctorContracts,
    private readonly isStringValidator: IsStringValidatorPort,
    private readonly isValidTokenValidator: IsValidTokenValidatorPort
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const token = httpRequest.headers?.authorization

      if (!token) {
        return badRequest(new MissingParamError('authorization token'))
      }

      const id = this.isValidTokenValidator.validate(token)

      if (!id) {
        return unauthorized(new UnauthorizedError())
      }

      if (!this.isStringValidator.validate(id)) {
        return badRequest(new InvalidParamError('id'))
      }

      const doctor = await this.doctorService.findOne({ id })

      if (!doctor) {
        return notFound(new NotFoundError('doctor'))
      }

      return ok(doctor)
    } catch (error) {
      return serverError(error)
    }
  }
}
