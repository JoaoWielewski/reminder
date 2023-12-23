import { PERIOD_TYPE } from '../../../domain/entities/enums/period-type'
import { Reminder } from '../../../domain/entities/reminder'

export namespace CreateReminderCase {
  export type Input = {
    doctorId: string
    pacientName: string
    pacientPhone: string
    periodType: PERIOD_TYPE
    periodQuantity: number
  }

  export type Output = Reminder

  export interface Contract {
    create: (input: Input) => Promise<Output>
  }
}
