import { ReminderContracts } from '../../../data/services/reminder'
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

export class DeleteReminderController implements Controller {
  constructor(
    private readonly reminderService: ReminderContracts,
    private readonly isStringValidator: IsStringValidatorPort,
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

      const requiredFields = ['id']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { id } = httpRequest.body

      if (!this.isStringValidator.validate(id)) {
        return badRequest(new InvalidParamError('id'))
      }

      if (!this.isStringValidator.validate(doctorId)) {
        return badRequest(new InvalidParamError('doctorId'))
      }

      await this.reminderService.delete({ doctorId, id })

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
