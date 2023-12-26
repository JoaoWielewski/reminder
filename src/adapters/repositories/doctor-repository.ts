import { Doctor } from '../../domain/entities/doctor'
import { DbConnection } from '../../infra/db/knex'
import { DoctorRepositoryPort } from '../../ports/repositories/doctor-repository'
import { UpdateDoctorDto } from '../../ports/repositories/dtos/doctor/update-doctor'
import { doctorMapper } from './mappers/doctor'

export class DoctorRepositoryAdapter implements DoctorRepositoryPort.Contracts {
  async findOne(id: string): Promise<Doctor | null> {
    const doctor = await DbConnection.getInstace()
      .select('*')
      .from('doctor')
      .where('id', id)
      .first()

    if (!doctor) {
      return null
    }

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

  async update({ id, ...fieldsToUpdate }: UpdateDoctorDto): Promise<void> {
    await DbConnection.getInstace()('doctor')
      .where('id', id)
      .update({ ...fieldsToUpdate, updated_at: new Date() })
  }

  async resetReminders(): Promise<void> {
    await DbConnection.getInstace()('doctor').update(
      'remaining_reminders',
      DbConnection.getInstace().raw('monthly_reminders')
    )
  }

  async findOneByEmail(email: string): Promise<Doctor | null> {
    const doctor = await DbConnection.getInstace()
      .select('*')
      .from('doctor')
      .where('email', email)
      .first()

    if (!doctor) {
      return null
    }
    return doctorMapper().toEntity(doctor)
  }
}
