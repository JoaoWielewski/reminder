import { PRONOUN } from './enums/pronoun'

export type DoctorDomain = {
  id: string
  name: string
  phone: string
  specialty: string
  daysToSchedule: number
  email: string
  pronoun: PRONOUN
  monthlyReminders: number
  remainingReminders: number
  isActive: boolean
  schedulePhone: string
  password: string
  createdAt: Date
  updatedAt?: Date
}

export class Doctor implements DoctorDomain {
  id: string
  name: string
  phone: string
  specialty: string
  daysToSchedule: number
  email: string
  pronoun: PRONOUN
  monthlyReminders: number
  remainingReminders: number
  isActive: boolean
  schedulePhone: string
  password: string
  createdAt: Date
  updatedAt?: Date

  constructor(props: DoctorDomain) {
    Object.assign(this, props)
  }
}
