import { IsIntegerValidatorAdapter } from '../../../../adapters/validators/is-integer'
import { IsStringValidatorAdapter } from '../../../../adapters/validators/is-string'
import { CreateReminderController } from '../../../../presentation/controllers/reminder/create-reminder'
import { makeReminderService } from '../../services/reminder'

export const makeCreateReminderController = (): CreateReminderController => {
  return new CreateReminderController(
    makeReminderService(),
    new IsStringValidatorAdapter(),
    new IsIntegerValidatorAdapter()
  )
}
