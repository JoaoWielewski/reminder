import { Reminder } from '../../domain/entities/reminder'
import { DeleteActiveRemindersDto } from './dtos/reminder/delete-active-reminders'

export namespace ReminderRepositoryPort {
  export interface Contracts {
    create(input: Reminder): Promise<void>
    deleteActiveReminders(input: DeleteActiveRemindersDto): Promise<number>
    find(doctorId: string): Promise<Reminder[]>
    delete(id: string): Promise<void>
  }
}
