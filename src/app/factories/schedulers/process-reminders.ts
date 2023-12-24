import { ProcessRemindersScheduler } from '../../../presentation/schedulers/process-reminders'
import { makeReminderService } from '../services/reminder'

export const makeProcessRemindersScheduler = (): ProcessRemindersScheduler => {
  return new ProcessRemindersScheduler(makeReminderService())
}
