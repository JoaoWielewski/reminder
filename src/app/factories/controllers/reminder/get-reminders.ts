import { IsArrayEmptyValidatorAdapter } from '../../../../adapters/validators/is-array-empty'
import { IsIntegerValidatorAdapter } from '../../../../adapters/validators/is-integer'
import { IsStringValidatorAdapter } from '../../../../adapters/validators/is-string'
import { IsValidTokenValidatorAdapter } from '../../../../adapters/validators/is-valid-token'
import { GetRemindersController } from '../../../../presentation/controllers/reminder/get-reminders'
import { makeReminderService } from '../../services/reminder'

export const makeGetRemindersController = (): GetRemindersController => {
  return new GetRemindersController(
    makeReminderService(),
    new IsStringValidatorAdapter(),
    new IsArrayEmptyValidatorAdapter(),
    new IsValidTokenValidatorAdapter(),
    new IsIntegerValidatorAdapter()
  )
}
