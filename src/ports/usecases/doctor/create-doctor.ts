import { Doctor } from '../../../domain/entities/doctor'

export namespace CreateDoctorCase {
  export type Input = {
    name: string
    phone: string
    specialty: string
    email: string
    pronoun: string
    daysToSchedule: number
    schedulePhone: string
    password: string
  }

  export type Output = Doctor

  export interface Contract {
    create: (input: Input) => Promise<Output>
  }
}
