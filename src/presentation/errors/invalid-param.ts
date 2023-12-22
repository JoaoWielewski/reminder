export class InvalidParamError extends Error {
  constructor(paramName: string) {
    super(`Invalid param(s): ${paramName}`)
    this.name = 'PLUGIN_SERVICE_INVALID_PARAM'
  }
}
