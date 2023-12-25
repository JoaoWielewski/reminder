export class WrongPasswordError extends Error {
  constructor() {
    super(`The password is wrong`)
    this.name = 'PLUGIN_SERVICE_WRONG_PASSWORD'
  }
}
