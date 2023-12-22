import { Doctor } from '../../domain/entities/doctor'
import { DbConnection } from '../../infra/db/knex'
import { DoctorRepositoryPort } from '../../ports/repositories/doctor-repository'
import { doctorMapper } from './mappers/doctor'

export class DoctorRepositoryAdapter implements DoctorRepositoryPort.Contracts {
  async findOne(id: string): Promise<Doctor> {
    const doctor = await DbConnection.getInstace()
      .select('*')
      .from('doctor')
      .where('id', id)
      .first()
    return doctorMapper().toEntity(doctor)
  }

  async create({
    id,
    name,
    phone,
    specialty,
    daysToSchedule,
    email,
    pronoun,
    monthlyReminders,
    remainingReminders,
    isActive,
    schedulePhone,
    password,
    createdAt
  }: Doctor): Promise<void> {
    await DbConnection.getInstace()('doctor').insert({
      id,
      name,
      phone,
      specialty,
      days_to_schedule: daysToSchedule,
      email,
      pronoun,
      monthly_reminders: monthlyReminders,
      remaining_reminders: remainingReminders,
      is_active: isActive,
      schedule_phone: schedulePhone,
      password,
      created_at: createdAt
    })
  }
}
