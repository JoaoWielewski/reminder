import { Doctor } from '../../../domain/entities/doctor'
import { EntityMapper } from './protocols/entity-mapper'

export const doctorMapper = (): EntityMapper<Doctor> => {
  return {
    toEntity(doctor: any): Doctor {
      return new Doctor({
        id: doctor.id,
        name: doctor.name,
        phone: doctor.phone,
        specialty: doctor.specialty,
        daysToSchedule: doctor.days_to_schedule,
        email: doctor.email,
        pronoun: doctor.pronoun,
        monthlyReminders: doctor.monthly_reminders,
        remainingReminders: doctor.remaining_reminders,
        isActive: doctor.is_active,
        schedulePhone: doctor.schedule_phone,
        password: doctor.password,
        createdAt: doctor.created_at,
        updatedAt: doctor.updated_at
      })
    },
    toArrayOfEntities(doctors: any[]): Doctor[] {
      return doctors.map(doctor => this.toEntity(doctor))
    }
  }
}
