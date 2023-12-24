import { DoctorContracts } from '../../data/services/doctor'
import { ok, serverError } from '../helpers/http'
import { HttpResponse } from '../protocols/http'
import { Scheduler } from '../protocols/scheduler'

export class ResetRemindersScheduler implements Scheduler {
  constructor(private readonly doctorService: DoctorContracts) {}

  async handle(): Promise<HttpResponse> {
    try {
      await this.doctorService.resetReminders()

      return ok()
    } catch (error) {
      return serverError(error)
    }
  }
}
