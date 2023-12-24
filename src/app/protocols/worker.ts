import { SqsEvent } from '../../presentation/protocols/sqs'

export interface Worker {
  handle: (event: SqsEvent<any>) => void
}
