import { GenerateIdAdapter } from '../../../adapters/crypto/generate-id'
import { DoctorRepositoryAdapter } from '../../../adapters/repositories/doctor-repository'
import { ReminderRepositoryAdapter } from '../../../adapters/repositories/reminder-repository'
import { IsBusinessDayValidatorAdapter } from '../../../adapters/utils/is-business-day'
import { PeriodFormatterAdapter } from '../../../adapters/utils/period-formatter'
import { ReminderService } from '../../../data/services/reminder'
import { SQSProvider } from '../../../infra/aws/sqs'
import { Environment } from '../../env'

export const makeReminderService = (): ReminderService => {
  return new ReminderService(
    new ReminderRepositoryAdapter(),
    new DoctorRepositoryAdapter(),
    new GenerateIdAdapter(),
    new SQSProvider(Environment.REGION),
    new PeriodFormatterAdapter(),
    new IsBusinessDayValidatorAdapter()
  )
}
