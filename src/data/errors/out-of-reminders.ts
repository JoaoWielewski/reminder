export class OutOfRemindersError extends Error {
  constructor(doctorId: string) {
    super(`Doctor ${doctorId} is out of reminders`)
    this.name = 'PLUGIN_SERVICE_OUT_OF_REMINDERS'
  }
}
