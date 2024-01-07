import { IsArrayEmptyValidatorAdapter } from '../../../../adapters/validators/is-array-empty'
import { IsIntegerValidatorAdapter } from '../../../../adapters/validators/is-integer'
import { IsStringValidatorAdapter } from '../../../../adapters/validators/is-string'
import { IsValidTokenValidatorAdapter } from '../../../../adapters/validators/is-valid-token'
import { SearchRemindersController } from '../../../../presentation/controllers/reminder/search-reminders'
import { makeReminderService } from '../../services/reminder'

export const makeSearchRemindersController = (): SearchRemindersController => {
  return new SearchRemindersController(
    makeReminderService(),
    new IsStringValidatorAdapter(),
    new IsArrayEmptyValidatorAdapter(),
    new IsValidTokenValidatorAdapter(),
    new IsIntegerValidatorAdapter()
  )
}
