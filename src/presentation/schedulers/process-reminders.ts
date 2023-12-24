import { ReminderContracts } from '../../data/services/reminder'
import { ok, serverError } from '../helpers/http'
import { HttpResponse } from '../protocols/http'
import { Scheduler } from '../protocols/scheduler'

export class ProcessRemindersScheduler implements Scheduler {
  constructor(private readonly reminderService: ReminderContracts) {}

  async handle(): Promise<HttpResponse> {
    try {
      await this.reminderService.process()

      return ok()
    } catch (error) {
      return serverError(error)
    }
  }
}
