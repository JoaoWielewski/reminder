import { ReminderContracts } from '../../../data/services/reminder'
import { IsIntegerValidatorPort } from '../../../ports/validators/is-integer'
import { IsStringValidatorPort } from '../../../ports/validators/is-string'
import { InvalidParamError } from '../../errors/invalid-param'
import { MissingParamError } from '../../errors/missing-param'
import { badRequest, created, serverError } from '../../helpers/http'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class CreateReminderController implements Controller {
  constructor(
    private readonly reminderService: ReminderContracts,
    private readonly isStringValidator: IsStringValidatorPort,
    private readonly isIntegerValidator: IsIntegerValidatorPort
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = [
        'doctorId',
        'pacientName',
        'pacientPhone',
        'periodType',
        'periodQuantity'
      ]

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const {
        doctorId,
        pacientName,
        pacientPhone,
        periodType,
        periodQuantity
      } = httpRequest.body

      if (!this.isStringValidator.validate(doctorId)) {
        return badRequest(new InvalidParamError('doctorId'))
      }

      if (!this.isStringValidator.validate(pacientName)) {
        return badRequest(new InvalidParamError('pacientName'))
      }

      if (!this.isStringValidator.validate(pacientPhone)) {
        return badRequest(new InvalidParamError('pacientPhone'))
      }

      if (!this.isStringValidator.validate(periodType)) {
        return badRequest(new InvalidParamError('periodType'))
      }

      if (!this.isIntegerValidator.validate(periodQuantity)) {
        return badRequest(new InvalidParamError('periodQuantity'))
      }

      const reminder = await this.reminderService.create({
        doctorId,
        pacientName,
        pacientPhone,
        periodType,
        periodQuantity
      })

      return created(reminder)
    } catch (error) {
      return serverError(error)
    }
  }
}
