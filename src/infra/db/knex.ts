import knex, { Knex } from 'knex'
import { Environment } from '../../app/env'

export class DbConnection {
  static instance: Knex

  static getInstance(): Knex {
    if (!this.instance) {
      this.instance = knex({
        client: 'pg',
        connection: {
          connectionString: Environment.DB_URL
        }
      })
    }
    return this.instance
  }
}
