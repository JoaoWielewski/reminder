import { ReminderContracts } from '../../../data/services/reminder'
import { IsIntegerValidatorPort } from '../../../ports/validators/is-integer'
import { IsStringValidatorPort } from '../../../ports/validators/is-string'
import { IsValidTokenValidatorPort } from '../../../ports/validators/is-valid-token'
import { InvalidParamError } from '../../errors/invalid-param'
import { MissingParamError } from '../../errors/missing-param'
import { UnauthorizedError } from '../../errors/unauthorized'
import {
  badRequest,
  created,
  serverError,
  unauthorized
} from '../../helpers/http'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class CreateReminderController implements Controller {
  constructor(
    private readonly reminderService: ReminderContracts,
    private readonly isStringValidator: IsStringValidatorPort,
    private readonly isIntegerValidator: IsIntegerValidatorPort,
    private readonly isValidTokenValidator: IsValidTokenValidatorPort
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const token = httpRequest.headers?.authorization

      if (!token) {
        return badRequest(new MissingParamError('authorization token'))
      }

      const doctorId = this.isValidTokenValidator.validate(token)

      if (!doctorId) {
        return unauthorized(new UnauthorizedError())
      }

      const requiredFields = [
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

      const { pacientName, pacientPhone, periodType, periodQuantity } =
        httpRequest.body

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
