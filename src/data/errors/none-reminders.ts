export class NoneRemindersError extends Error {
  constructor(doctorId: string) {
    super(`Doctor ${doctorId} has no reminders`)
    this.name = 'PLUGIN_SERVICE_NONE_REMINDERS'
  }
}
