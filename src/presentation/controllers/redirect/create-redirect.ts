import { RedirectContracts } from '../../../data/services/redirect'
import { IsStringValidatorPort } from '../../../ports/validators/is-string'
import { InvalidParamError } from '../../errors/invalid-param'
import { MissingParamError } from '../../errors/missing-param'
import { badRequest, created, serverError } from '../../helpers/http'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class CreateRedirectController implements Controller {
  constructor(
    private readonly redirectService: RedirectContracts,
    private readonly isStringValidator: IsStringValidatorPort
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['reminderId']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { reminderId } = httpRequest.body

      if (!this.isStringValidator.validate(reminderId)) {
        return badRequest(new InvalidParamError('reminderId'))
      }

      await this.redirectService.create({
        reminderId
      })

      return created()
    } catch (error) {
      return serverError(error)
    }
  }
}
