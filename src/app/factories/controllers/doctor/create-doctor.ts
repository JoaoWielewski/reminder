import { IsEmailValidatorAdapter } from '../../../../adapters/validators/is-email'
import { IsStringValidatorAdapter } from '../../../../adapters/validators/is-string'
import { IsValidPronounValidatorAdapter } from '../../../../adapters/validators/is-valid-locale'
import { CreateDoctorController } from '../../../../presentation/controllers/doctor/create-doctor'
import { makeDoctorService } from '../../services/doctor'

export const makeCreateDoctorController = (): CreateDoctorController => {
  return new CreateDoctorController(
    makeDoctorService(),
    new IsStringValidatorAdapter(),
    new IsValidPronounValidatorAdapter(),
    new IsEmailValidatorAdapter()
  )
}
