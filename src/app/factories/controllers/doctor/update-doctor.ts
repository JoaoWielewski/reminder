import { IsEmailValidatorAdapter } from '../../../../adapters/validators/is-email'
import { IsIntegerValidatorAdapter } from '../../../../adapters/validators/is-integer'
import { IsStringValidatorAdapter } from '../../../../adapters/validators/is-string'
import { IsValidTokenValidatorAdapter } from '../../../../adapters/validators/is-valid-token'
import { UpdateDoctorController } from '../../../../presentation/controllers/doctor/update-doctor'
import { makeDoctorService } from '../../services/doctor'

export const makeUpdateDoctorController = (): UpdateDoctorController => {
  return new UpdateDoctorController(
    makeDoctorService(),
    new IsStringValidatorAdapter(),
    new IsIntegerValidatorAdapter(),
    new IsEmailValidatorAdapter(),
    new IsValidTokenValidatorAdapter()
  )
}
