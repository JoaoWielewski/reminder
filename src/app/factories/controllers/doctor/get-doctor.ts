import { IsStringValidatorAdapter } from '../../../../adapters/validators/is-string'
import { GetDoctorController } from '../../../../presentation/controllers/doctor/get-doctor'
import { makeDoctorService } from '../../services/doctor'

export const makeGetDoctorController = (): GetDoctorController => {
  return new GetDoctorController(
    makeDoctorService(),
    new IsStringValidatorAdapter()
  )
}
