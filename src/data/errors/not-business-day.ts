export class NotBusinessDayError extends Error {
  constructor() {
    super(`Today is not a business day`)
    this.name = 'PLUGIN_SERVICE_NOT_BUSINESS_DAY'
  }
}
