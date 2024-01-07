import { ReminderContracts } from '../../../data/services/reminder'
import { IsStringValidatorPort } from '../../../ports/validators/is-string'
import { IsValidTokenValidatorPort } from '../../../ports/validators/is-valid-token'
import { InvalidParamError } from '../../errors/invalid-param'
import { MissingParamError } from '../../errors/missing-param'
import { UnauthorizedError } from '../../errors/unauthorized'
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class CountRemindersController implements Controller {
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

      if (!this.isStringValidator.validate(doctorId)) {
        return badRequest(new InvalidParamError('doctorId'))
      }

      const count = await this.reminderService.count({ doctorId })

      return ok(count)
    } catch (error) {
      return serverError(error)
    }
  }
}
