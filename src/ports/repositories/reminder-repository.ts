import { Reminder } from '../../domain/entities/reminder'
import { DeleteActiveRemindersDto } from './dtos/reminder/delete-active-reminders'
import { GetRemindersDto } from './dtos/reminder/get-reminders'
import { SearchRemindersDto } from './dtos/reminder/search-reminders'

export namespace ReminderRepositoryPort {
  export interface Contracts {
    create(input: Reminder): Promise<void>
    deleteActiveReminders(input: DeleteActiveRemindersDto): Promise<number>
    find(input: GetRemindersDto): Promise<Reminder[]>
    delete(id: string): Promise<void>
    findActiveReminders(): Promise<Reminder[]>
    setToSent(id: string): Promise<void>
    search(input: SearchRemindersDto): Promise<Reminder[]>
  }
}
