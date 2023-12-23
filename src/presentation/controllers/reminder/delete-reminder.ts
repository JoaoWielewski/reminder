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
      const requiredFields = ['id', 'doctorId']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { id, doctorId } = httpRequest.body

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
