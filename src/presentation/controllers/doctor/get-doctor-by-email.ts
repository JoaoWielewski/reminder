import { DoctorContracts } from '../../../data/services/doctor'
import { IsEmailValidatorPort } from '../../../ports/validators/is-email'
import { InvalidParamError } from '../../errors/invalid-param'
import { MissingParamError } from '../../errors/missing-param'
import { badRequest, ok, serverError } from '../../helpers/http'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class GetDoctorByEmailController implements Controller {
  constructor(
    private readonly doctorService: DoctorContracts,
    private readonly isEmailValidator: IsEmailValidatorPort
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { email } = httpRequest.body

      if (!this.isEmailValidator.validate(email)) {
        return badRequest(new InvalidParamError('email'))
      }

      const boolean = await this.doctorService.findOneByEmail({
        email
      })

      return ok(boolean)
    } catch (error) {
      return serverError(error)
    }
  }
}
