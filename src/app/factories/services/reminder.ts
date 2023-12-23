import { GenerateIdAdapter } from '../../../adapters/crypto/generate-id'
import { DoctorRepositoryAdapter } from '../../../adapters/repositories/doctor-repository'
import { ReminderRepositoryAdapter } from '../../../adapters/repositories/reminder-repository'
import { ReminderService } from '../../../data/services/reminder'

export const makeReminderService = (): ReminderService => {
  return new ReminderService(
    new ReminderRepositoryAdapter(),
    new DoctorRepositoryAdapter(),
    new GenerateIdAdapter()
  )
}
