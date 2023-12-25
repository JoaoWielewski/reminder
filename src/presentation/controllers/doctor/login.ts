import { DoctorContracts } from '../../../data/services/doctor'
import { IsEmailValidatorPort } from '../../../ports/validators/is-email'
import { IsStringValidatorPort } from '../../../ports/validators/is-string'
import { InvalidParamError } from '../../errors/invalid-param'
import { MissingParamError } from '../../errors/missing-param'
import { badRequest, ok, serverError } from '../../helpers/http'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class LoginController implements Controller {
  constructor(
    private readonly doctorService: DoctorContracts,
    private readonly isStringValidator: IsStringValidatorPort,
    private readonly isEmailValidator: IsEmailValidatorPort
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { email, password } = httpRequest.body

      if (!this.isEmailValidator.validate(email)) {
        return badRequest(new InvalidParamError('email'))
      }

      if (!this.isStringValidator.validate(password)) {
        return badRequest(new InvalidParamError('password'))
      }

      const doctor = await this.doctorService.login({ email, password })

      return ok(doctor)
    } catch (error) {
      return serverError(error)
    }
  }
}
