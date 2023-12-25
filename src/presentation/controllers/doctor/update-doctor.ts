import { DoctorContracts } from '../../../data/services/doctor'
import { IsEmailValidatorPort } from '../../../ports/validators/is-email'
import { IsIntegerValidatorPort } from '../../../ports/validators/is-integer'
import { IsStringValidatorPort } from '../../../ports/validators/is-string'
import { IsValidTokenValidatorPort } from '../../../ports/validators/is-valid-token'
import { InvalidParamError } from '../../errors/invalid-param'
import { MissingParamError } from '../../errors/missing-param'
import { UnauthorizedError } from '../../errors/unauthorized'
import {
  badRequest,
  noContent,
  serverError,
  unauthorized
} from '../../helpers/http'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class UpdateDoctorController implements Controller {
  constructor(
    private readonly doctorService: DoctorContracts,
    private readonly isStringValidator: IsStringValidatorPort,
    private readonly isIntegerValidator: IsIntegerValidatorPort,
    private readonly isEmailValidator: IsEmailValidatorPort,
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

      const { phone, specialty, email, daysToSchedule, schedulePhone } =
        httpRequest.body

      if (!this.isStringValidator.validate(id)) {
        return badRequest(new InvalidParamError('id'))
      }

      if (phone) {
        if (!this.isStringValidator.validate(phone)) {
          return badRequest(new InvalidParamError('phone'))
        }
      }

      if (specialty) {
        if (!this.isStringValidator.validate(specialty)) {
          return badRequest(new InvalidParamError('specialty'))
        }
      }

      if (schedulePhone) {
        if (!this.isStringValidator.validate(schedulePhone)) {
          return badRequest(new InvalidParamError('schedulePhone'))
        }
      }

      if (daysToSchedule) {
        if (!this.isIntegerValidator.validate(daysToSchedule)) {
          return badRequest(new InvalidParamError('daysToSchedule'))
        }
      }

      if (email) {
        if (!this.isEmailValidator.validate(email)) {
          return badRequest(new InvalidParamError('email'))
        }
      }

      await this.doctorService.update({
        id,
        phone,
        specialty,
        email,
        daysToSchedule,
        schedulePhone
      })

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
