export class NotFoundError extends Error {
  constructor(entity: string) {
    super(`Entity ${entity} not found`)
    this.name = 'PLUGIN_SERVICE_NOT_FOUND'
  }
}
