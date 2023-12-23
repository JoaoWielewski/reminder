import { Reminder } from '../../../domain/entities/reminder'

export namespace GetRemindersCase {
  export type Input = {
    doctorId: string
  }

  export type Output = Reminder[]

  export interface Contract {
    findMany: (input: Input) => Promise<Output>
  }
}
