import { HttpResponse } from './http'

export interface Scheduler {
  handle: () => Promise<HttpResponse>
}
