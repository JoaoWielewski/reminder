import { MessageSenderContract } from '../../ports/providers/message-provider'
import { ReminderRepositoryPort } from '../../ports/repositories/reminder-repository'
import { SqsEvent } from '../../presentation/protocols/sqs'
import { Worker } from '../protocols/worker'
import { MessageNotSentError } from './errors/message-not-sent'

export type SendMessageDto = {
  reminderId: string
  pacientName: string
  doctorName: string
  period: string
  date: string
  daysToSchedule: number
  specialty: string
  pacientPhone: string
  pronoun: string
  schedulePhone: string
}

export class MessageWorker implements Worker {
  constructor(
    private readonly messageSender: MessageSenderContract,
    private readonly reminderRepository: ReminderRepositoryPort.Contracts
  ) {}

  async handle(event: SqsEvent<any>): Promise<void> {
    for await (const { body: sendMessageDtoString } of event.Records) {
      const sendMessageDto: SendMessageDto = JSON.parse(sendMessageDtoString)

      const messageWasSent = await this.messageSender.send(sendMessageDto)

      if (!messageWasSent) {
        throw new MessageNotSentError()
      }

      await this.reminderRepository.setToSent(sendMessageDto.reminderId)
    }
  }
}
