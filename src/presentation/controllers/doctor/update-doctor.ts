import { DoctorContracts } from '../../../data/services/doctor'
import { IsEmailValidatorPort } from '../../../ports/validators/is-email'
import { IsIntegerValidatorPort } from '../../../ports/validators/is-integer'
import { IsStringValidatorPort } from '../../../ports/validators/is-string'
import { InvalidParamError } from '../../errors/invalid-param'
import { MissingParamError } from '../../errors/missing-param'
import { badRequest, noContent, serverError } from '../../helpers/http'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class UpdateDoctorController implements Controller {
  constructor(
    private readonly doctorService: DoctorContracts,
    private readonly isStringValidator: IsStringValidatorPort,
    private readonly isIntegerValidator: IsIntegerValidatorPort,
    private readonly isEmailValidator: IsEmailValidatorPort
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['id']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { id, phone, specialty, email, daysToSchedule, schedulePhone } =
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
