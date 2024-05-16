import { SendMessageDto } from '../../../ports/providers/dtos/send-message-dto'
import { MessageSenderContract } from '../../../ports/providers/message-provider'
import { WhatsappProvider } from '../whatsapp'

export class WhatsappService implements MessageSenderContract {
  private readonly whatsappProvider = WhatsappProvider.getInstance()

  async send({
    pacientName,
    doctorName,
    period,
    date,
    daysToSchedule,
    specialty,
    pacientPhone,
    schedulePhone,
    pronoun,
    reminderId
  }: SendMessageDto): Promise<boolean> {
    const baseTemplateName = daysToSchedule ? 'lembrete_mkt' : 'lembrete'
    const templateName = baseTemplateName + (pronoun === 'M' ? '_m' : '_f')

    if (daysToSchedule) {
      const response = await this.whatsappProvider.post('/messages', {
        messaging_product: 'whatsapp',
        to: '55' + pacientPhone,
        type: 'template',
        template: {
          name: templateName,
          language: {
            code: 'pt_BR'
          },
          components: [
            {
              type: 'body',
              parameters: [
                {
                  type: 'text',
                  text: pacientName
                },
                {
                  type: 'text',
                  text: doctorName
                },
                {
                  type: 'text',
                  text: period
                },
                {
                  type: 'text',
                  text: date
                },
                {
                  type: 'text',
                  text: daysToSchedule.toString()
                },
                {
                  type: 'text',
                  text: specialty
                }
              ]
            },
            {
              type: 'button',
              sub_type: 'url',
              index: '0',
              parameters: [
                {
                  type: 'text',
                  text: `src/index.html?phone=55${schedulePhone}&name=${encodeURIComponent(
                    doctorName
                  )}&date=${date}&pronoun=${pronoun}&id=${reminderId}&early=true`
                }
              ]
            }
          ]
        }
      })

      if (response.data.messages[0].message_status === 'accepted') {
        return true
      }

      return false
    } else {
      const response = await this.whatsappProvider.post('/messages', {
        messaging_product: 'whatsapp',
        to: '55' + pacientPhone,
        type: 'template',
        template: {
          name: templateName,
          language: {
            code: 'pt_BR'
          },
          components: [
            {
              type: 'body',
              parameters: [
                {
                  type: 'text',
                  text: pacientName
                },
                {
                  type: 'text',
                  text: doctorName
                },
                {
                  type: 'text',
                  text: period
                },
                {
                  type: 'text',
                  text: date
                },
                {
                  type: 'text',
                  text: specialty
                }
              ]
            },
            {
              type: 'button',
              sub_type: 'url',
              index: '0',
              parameters: [
                {
                  type: 'text',
                  text: `src/index.html?phone=55${schedulePhone}&name=${encodeURIComponent(
                    doctorName
                  )}&date=${date}&pronoun=${pronoun}&id=${reminderId}&early=false`
                }
              ]
            }
          ]
        }
      })

      if (response.data.messages[0].message_status === 'accepted') {
        return true
      }

      return false
    }
  }
}
