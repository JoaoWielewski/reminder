import { ReminderContracts } from '../../../data/services/reminder'
import { IsArrayEmptyValidatorPort } from '../../../ports/validators/is-array-empty'
import { IsStringValidatorPort } from '../../../ports/validators/is-string'
import { InvalidParamError } from '../../errors/invalid-param'
import { MissingParamError } from '../../errors/missing-param'
import { NotFoundError } from '../../errors/not-found'
import { badRequest, notFound, ok, serverError } from '../../helpers/http'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class GetRemindersController implements Controller {
  constructor(
    private readonly reminderService: ReminderContracts,
    private readonly isStringValidator: IsStringValidatorPort,
    private readonly isArrayEmptyValidator: IsArrayEmptyValidatorPort
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['doctorId']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { doctorId } = httpRequest.body

      if (!this.isStringValidator.validate(doctorId)) {
        return badRequest(new InvalidParamError('doctorId'))
      }

      const reminders = await this.reminderService.findMany({ doctorId })

      if (this.isArrayEmptyValidator.validate(reminders))
        return notFound(new NotFoundError('reminders'))

      return ok(reminders)
    } catch (error) {
      return serverError(error)
    }
  }
}
