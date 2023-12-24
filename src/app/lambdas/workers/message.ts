import { SqsEvent } from '../../../presentation/protocols/sqs'
import { makeMessageWorker } from '../../factories/workers/message'
import { proxyRequest } from '../../proxy-request'

export const handler = async (event: SqsEvent<any>, context: any) => {
  const worker = makeMessageWorker()
  return proxyRequest(event as any, context, worker, 'sqs')
}
