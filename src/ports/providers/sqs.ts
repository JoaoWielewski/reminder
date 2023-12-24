export interface SQSProviderPort {
  sendMessageToQueue: (messageBody: string, queueName: string) => Promise<void>
}
