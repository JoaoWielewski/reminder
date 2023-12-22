export class ConflictError extends Error {
  constructor(entity: string) {
    super(`Conflict with ${entity}`)
    this.name = 'PLUGIN_SERVICE_CONFLICT'
  }
}
