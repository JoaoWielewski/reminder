export class EventNotAllowedError extends Error {
  constructor(event: string) {
    super(`Event ${event} is not allowed`)
    this.name = 'PLUGIN_SERVICE_EVENT_NOT_ALLOWED'
  }
}
