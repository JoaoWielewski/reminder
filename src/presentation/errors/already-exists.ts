export class AlreadyExistsError extends Error {
  constructor(entity: string) {
    super(`Entity ${entity} already exists`)
    this.name = 'PLUGIN_SERVICE_ALREADY_EXISTS'
  }
}
