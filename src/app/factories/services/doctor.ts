import { GenerateIdAdapter } from '../../../adapters/crypto/generate-id'
import { DoctorRepositoryAdapter } from '../../../adapters/repositories/doctor-repository'
import { DoctorService } from '../../../data/services/doctor'

export const makeDoctorService = (): DoctorService => {
  return new DoctorService(
    new DoctorRepositoryAdapter(),
    new GenerateIdAdapter()
  )
}
