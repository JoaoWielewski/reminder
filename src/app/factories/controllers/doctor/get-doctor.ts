import { IsStringValidatorAdapter } from '../../../../adapters/validators/is-string'
import { IsValidTokenValidatorAdapter } from '../../../../adapters/validators/is-valid-token'
import { GetDoctorController } from '../../../../presentation/controllers/doctor/get-doctor'
import { makeDoctorService } from '../../services/doctor'

export const makeGetDoctorController = (): GetDoctorController => {
  return new GetDoctorController(
    makeDoctorService(),
    new IsStringValidatorAdapter(),
    new IsValidTokenValidatorAdapter()
  )
}
