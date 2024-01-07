import { ReminderContracts } from '../../../data/services/reminder'
import { IsArrayEmptyValidatorPort } from '../../../ports/validators/is-array-empty'
import { IsIntegerValidatorPort } from '../../../ports/validators/is-integer'
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

export class SearchRemindersController implements Controller {
  constructor(
    private readonly reminderService: ReminderContracts,
    private readonly isStringValidator: IsStringValidatorPort,
    private readonly isArrayEmptyValidator: IsArrayEmptyValidatorPort,
    private readonly isValidTokenValidator: IsValidTokenValidatorPort,
    private readonly isIntegerValidator: IsIntegerValidatorPort
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

      const requiredFields = ['query', 'page', 'limit']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { query, page, limit } = httpRequest.body

      if (!this.isStringValidator.validate(doctorId)) {
        return badRequest(new InvalidParamError('doctorId'))
      }

      if (!this.isStringValidator.validate(query)) {
        return badRequest(new InvalidParamError('query'))
      }

      if (!this.isIntegerValidator.validate(page)) {
        return badRequest(new InvalidParamError('page'))
      }

      if (!this.isIntegerValidator.validate(limit)) {
        return badRequest(new InvalidParamError('limit'))
      }

      const reminders = await this.reminderService.search({
        doctorId,
        page,
        limit,
        query
      })

      if (this.isArrayEmptyValidator.validate(reminders))
        return notFound(new NotFoundError('reminders'))

      return ok(reminders)
    } catch (error) {
      return serverError(error)
    }
  }
}
