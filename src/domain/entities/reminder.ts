import { PERIOD_TYPE } from './enums/period-type'
import { REMINDER_STATUS } from './enums/status'

export type ReminderDomain = {
  id: string
  doctorId: string
  pacientName: string
  pacientPhone: string
  periodType: string
  periodQuantity: number
  expectedReturnDate: Date
  status: REMINDER_STATUS
  createdAt: Date
  updatedAt?: Date
}

export class Reminder implements ReminderDomain {
  id: string
  doctorId: string
  pacientName: string
  pacientPhone: string
  periodType: PERIOD_TYPE
  periodQuantity: number
  expectedReturnDate: Date
  status: REMINDER_STATUS
  createdAt: Date
  updatedAt?: Date

  constructor(props: ReminderDomain) {
    Object.assign(this, props)
  }
}
