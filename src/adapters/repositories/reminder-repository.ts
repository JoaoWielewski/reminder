import { REMINDER_STATUS } from '../../domain/entities/enums/status'
import { Reminder } from '../../domain/entities/reminder'
import { DbConnection } from '../../infra/db/knex'
import { DeleteActiveRemindersDto } from '../../ports/repositories/dtos/reminder/delete-active-reminders'
import { GetRemindersDto } from '../../ports/repositories/dtos/reminder/get-reminders'
import { SearchRemindersDto } from '../../ports/repositories/dtos/reminder/search-reminders'
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
    await DbConnection.getInstance()('reminder').insert({
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
    const result = await DbConnection.getInstance()('reminder').delete().where({
      doctor_id: doctorId,
      pacient_phone: pacientPhone,
      status: REMINDER_STATUS.ACTIVE
    })

    return result
  }

  async find({ doctorId, page, limit }: GetRemindersDto): Promise<Reminder[]> {
    const reminders = await DbConnection.getInstance()
      .select('*')
      .from('reminder')
      .where('doctor_id', doctorId)
      .orderBy('created_at', 'desc')
      .limit(Number(limit))
      .offset((page - 1) * limit)

    return reminderMapper().toArrayOfEntities(reminders)
  }

  async search({
    doctorId,
    page,
    limit,
    query
  }: SearchRemindersDto): Promise<Reminder[]> {
    const reminders = await DbConnection.getInstance()
      .select('*')
      .from('reminder')
      .where('doctor_id', doctorId)
      .whereILike('pacient_name', `%${query}%`)
      .orWhereILike('pacient_phone', `%${query}%`)
      .orderBy('created_at', 'desc')
      .limit(Number(limit))
      .offset((page - 1) * limit)

    return reminderMapper().toArrayOfEntities(reminders)
  }

  async delete(id: string): Promise<void> {
    await DbConnection.getInstance()('reminder').delete().where('id', id)
  }

  async findActiveReminders(): Promise<Reminder[]> {
    const reminders = await DbConnection.getInstance()
      .select('*')
      .from('reminder')
      .where('status', REMINDER_STATUS.ACTIVE)

    return reminderMapper().toArrayOfEntities(reminders)
  }

  async setToSent(id: string): Promise<void> {
    await DbConnection.getInstance()('reminder')
      .where('id', id)
      .update({ status: REMINDER_STATUS.MESSAGE_SENT })
  }

  async count(doctorId: string): Promise<number> {
    const result = await DbConnection.getInstance()('reminder')
      .count('id')
      .where('doctor_id', doctorId)
    return parseInt(String(result[0].count))
  }
}
