import { IsStringValidatorAdapter } from '../../../../adapters/validators/is-string'
import { DeleteReminderController } from '../../../../presentation/controllers/reminder/delete-reminder'
import { makeReminderService } from '../../services/reminder'

export const makeDeleteReminderController = (): DeleteReminderController => {
  return new DeleteReminderController(
    makeReminderService(),
    new IsStringValidatorAdapter()
  )
}
