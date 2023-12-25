import { IsEmailValidatorAdapter } from '../../../../adapters/validators/is-email'
import { IsStringValidatorAdapter } from '../../../../adapters/validators/is-string'
import { LoginController } from '../../../../presentation/controllers/doctor/login'
import { makeDoctorService } from '../../services/doctor'

export const makeLoginController = (): LoginController => {
  return new LoginController(
    makeDoctorService(),
    new IsStringValidatorAdapter(),
    new IsEmailValidatorAdapter()
  )
}
