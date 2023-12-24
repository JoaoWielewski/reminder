import { ReminderRepositoryAdapter } from '../../../adapters/repositories/reminder-repository'
import { MessageWorker } from '../../workers/message'
import { makeWhatsappService } from '../services/whatsapp'

export const makeMessageWorker = (): MessageWorker => {
  return new MessageWorker(
    makeWhatsappService(),
    new ReminderRepositoryAdapter()
  )
}
