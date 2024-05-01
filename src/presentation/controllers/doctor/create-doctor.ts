import { DoctorContracts } from '../../../data/services/doctor'
import { IsEmailValidatorPort } from '../../../ports/validators/is-email'
import { IsStringValidatorPort } from '../../../ports/validators/is-string'
import { IsValidPronounValidatorPort } from '../../../ports/validators/is-valid-pronoun'
import { InvalidParamError } from '../../errors/invalid-param'
import { MissingParamError } from '../../errors/missing-param'
import { badRequest, created, serverError } from '../../helpers/http'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class CreateDoctorController implements Controller {
  constructor(
    private readonly doctorService: DoctorContracts,
    private readonly isStringValidator: IsStringValidatorPort,
    private readonly isValidPronounValidator: IsValidPronounValidatorPort,
    private readonly isEmailValidator: IsEmailValidatorPort
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = [
        'name',
        'phone',
        'specialty',
        'email',
        'pronoun',
        'schedulePhone',
        'password'
      ]

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const {
        name,
        phone,
        specialty,
        email,
        pronoun,
        schedulePhone,
        password
      } = httpRequest.body

      if (!this.isStringValidator.validate(name)) {
        return badRequest(new InvalidParamError('name'))
      }

      if (!this.isStringValidator.validate(phone)) {
        return badRequest(new InvalidParamError('phone'))
      }

      if (!this.isStringValidator.validate(specialty)) {
        return badRequest(new InvalidParamError('specialty'))
      }

      if (!this.isStringValidator.validate(password)) {
        return badRequest(new InvalidParamError('password'))
      }

      if (!this.isStringValidator.validate(schedulePhone)) {
        return badRequest(new InvalidParamError('schedulePhone'))
      }

      if (!this.isValidPronounValidator.validate(pronoun)) {
        return badRequest(new InvalidParamError('pronoun'))
      }

      if (!this.isEmailValidator.validate(email)) {
        return badRequest(new InvalidParamError('email'))
      }

      const doctor = await this.doctorService.create({
        name,
        phone,
        specialty,
        email,
        pronoun,
        schedulePhone,
        password
      })

      return created(doctor)
    } catch (error) {
      return serverError(error)
    }
  }
}
