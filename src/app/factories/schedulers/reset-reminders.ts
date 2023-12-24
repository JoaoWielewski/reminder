import { ResetRemindersScheduler } from '../../../presentation/schedulers/reset-reminders'
import { makeDoctorService } from '../services/doctor'

export const makeResetRemindersScheduler = (): ResetRemindersScheduler => {
  return new ResetRemindersScheduler(makeDoctorService())
}
