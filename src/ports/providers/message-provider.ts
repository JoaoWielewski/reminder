import { SendMessageDto } from './dtos/send-message-dto'

export interface MessageSenderContract {
  send: (input: SendMessageDto) => Promise<boolean>
}
