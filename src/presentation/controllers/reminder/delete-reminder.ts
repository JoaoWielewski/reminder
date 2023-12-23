import { ReminderContracts } from '../../../data/services/reminder'
import { IsStringValidatorPort } from '../../../ports/validators/is-string'
import { InvalidParamError } from '../../errors/invalid-param'
import { MissingParamError } from '../../errors/missing-param'
import { badRequest, noContent, serverError } from '../../helpers/http'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class DeleteReminderController implements Controller {
  constructor(
    private readonly reminderService: ReminderContracts,
    private readonly isStringValidator: IsStringValidatorPort
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
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

      await this.reminderService.delete({ id })

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
