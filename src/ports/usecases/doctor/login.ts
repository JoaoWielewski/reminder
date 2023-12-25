import { Doctor } from '../../../domain/entities/doctor'

export namespace LoginCase {
  export type Input = {
    email: string
    password: string
  }

  export type Output = Doctor & {
    jwt: string
  }

  export interface Contract {
    login: (input: Input) => Promise<Output>
  }
}
