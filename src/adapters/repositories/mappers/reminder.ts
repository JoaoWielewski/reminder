import { Reminder } from '../../../domain/entities/reminder'
import { EntityMapper } from './protocols/entity-mapper'

export const reminderMapper = (): EntityMapper<Reminder> => {
  return {
    toEntity(reminder: any): Reminder {
      return new Reminder({
        id: reminder.id,
        doctorId: reminder.doctor_id,
        pacientName: reminder.pacient_name,
        pacientPhone: reminder.pacient_phone,
        periodType: reminder.period_type,
        periodQuantity: reminder.period_quantity,
        expectedReturnDate: reminder.expected_return_date,
        status: reminder.status,
        createdAt: reminder.created_at,
        updatedAt: reminder.updated_at
      })
    },
    toArrayOfEntities(reminders: any[]): Reminder[] {
      return reminders.map(reminder => this.toEntity(reminder))
    }
  }
}
