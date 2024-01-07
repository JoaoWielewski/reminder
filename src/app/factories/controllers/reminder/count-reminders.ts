import { IsStringValidatorAdapter } from '../../../../adapters/validators/is-string'
import { IsValidTokenValidatorAdapter } from '../../../../adapters/validators/is-valid-token'
import { CountRemindersController } from '../../../../presentation/controllers/reminder/count-reminders'
import { makeReminderService } from '../../services/reminder'

export const makeCountRemindersController = (): CountRemindersController => {
  return new CountRemindersController(
    makeReminderService(),
    new IsStringValidatorAdapter(),
    new IsValidTokenValidatorAdapter()
  )
}
