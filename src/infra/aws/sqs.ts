import { SQS } from 'aws-sdk'
import { SQSProviderPort } from '../../ports/providers/sqs'

export class SQSProvider implements SQSProviderPort {
  sqsClient: SQS

  constructor(region: string) {
    this.sqsClient = new SQS({
      region
    })
  }

  async sendMessageToQueue(
    messageBody: string,
    queueName: string
  ): Promise<void> {
    const url = await this.sqsClient
      .getQueueUrl({ QueueName: queueName })
      .promise()

    const paramSendMessage: SQS.SendMessageRequest = {
      MessageBody: messageBody,
      QueueUrl: url.QueueUrl!
    }

    const response = await this.sqsClient
      .sendMessage(paramSendMessage)
      .promise()

    if (!response) {
      console.log('Error on sending message to queue')
    }
  }
}
