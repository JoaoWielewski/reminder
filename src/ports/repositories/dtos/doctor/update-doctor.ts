import { PRONOUN } from '../../../../domain/entities/enums/pronoun'

export interface UpdateDoctorDto {
  id: string
  name?: string
  phone?: string
  specialty?: string
  days_to_schedule?: number
  email?: string
  pronoun?: PRONOUN
  monthly_reminders?: number
  remaining_reminders?: number
  is_active?: boolean
  schedule_phone?: string
}
