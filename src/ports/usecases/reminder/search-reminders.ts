import { Reminder } from '../../../domain/entities/reminder'

export namespace SearchRemindersCase {
  export type Input = {
    doctorId: string
    page: number
    limit: number
    query: string
  }

  export type Output = Reminder[]

  export interface Contract {
    search: (input: Input) => Promise<Output>
  }
}
