import { REMINDER_STATUS } from '../../domain/entities/enums/status'
import { Reminder } from '../../domain/entities/reminder'
import { DbConnection } from '../../infra/db/knex'
import { DeleteActiveRemindersDto } from '../../ports/repositories/dtos/reminder/delete-active-reminders'
import { ReminderRepositoryPort } from '../../ports/repositories/reminder-repository'
import { reminderMapper } from './mappers/reminder'

export class ReminderRepositoryAdapter
  implements ReminderRepositoryPort.Contracts
{
  async create({
    id,
    doctorId,
    pacientName,
    pacientPhone,
    periodType,
    periodQuantity,
    expectedReturnDate,
    status,
    createdAt
  }: Reminder): Promise<void> {
    await DbConnection.getInstace()('reminder').insert({
      id,
      doctor_id: doctorId,
      pacient_name: pacientName,
      pacient_phone: pacientPhone,
      period_type: periodType,
      period_quantity: periodQuantity,
      expected_return_date: expectedReturnDate,
      status,
      created_at: createdAt
    })
  }

  async deleteActiveReminders({
    doctorId,
    pacientPhone
  }: DeleteActiveRemindersDto): Promise<number> {
    const result = await DbConnection.getInstace()('reminder').delete().where({
      doctor_id: doctorId,
      pacient_phone: pacientPhone,
      status: REMINDER_STATUS.WAITING
    })

    return result
  }

  async find(doctorId: string): Promise<Reminder[]> {
    const reminders = await DbConnection.getInstace()
      .select('*')
      .from('reminder')
      .where('doctor_id', doctorId)

    return reminderMapper().toArrayOfEntities(reminders)
  }

  async delete(id: string): Promise<void> {
    await DbConnection.getInstace()('reminder').delete().where('id', id)
  }
}
