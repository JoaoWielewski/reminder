export class MissingParamError extends Error {
  constructor(paramName: string) {
    super(`Missing param: ${paramName}`)
    this.name = 'PLUGIN_SERVICE_MISSING_PARAM'
  }
}
