type SqsEventItem<T> = {
  messageId: string
  receiptHandle: string
  body: T
  attributes: any[]
  messageAttributes: any[]
  md5OfBody: string
  eventSource: string
  eventSourceARN: string
  awsRegion: string
}

export interface SqsEvent<T> {
  Records: Array<SqsEventItem<T>>
}

export interface SqsSingleEvent<T> {
  Records: SqsEventItem<T>
}
