import { WhatsappService } from '../../../infra/whatsapp/services/whatsapp'

export const makeWhatsappService = (): WhatsappService => {
  return new WhatsappService()
}
