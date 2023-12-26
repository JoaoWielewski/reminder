import { IsEmailValidatorAdapter } from '../../../../adapters/validators/is-email'
import { GetDoctorByEmailController } from '../../../../presentation/controllers/doctor/get-doctor-by-email'
import { makeDoctorService } from '../../services/doctor'

export const makeGetDoctorByEmailController =
  (): GetDoctorByEmailController => {
    return new GetDoctorByEmailController(
      makeDoctorService(),
      new IsEmailValidatorAdapter()
    )
  }
