export class MessageNotSentError extends Error {
  constructor() {
    super(`The message couldn't be sent`)
    this.name = 'PLUGIN_SERVICE_MESSAGE_NOT_SENT'
  }
}
