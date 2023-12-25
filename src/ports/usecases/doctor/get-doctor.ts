import { Doctor } from '../../../domain/entities/doctor'

export namespace GetDoctorCase {
  export type Input = {
    id: string
  }

  export type Output = Doctor

  export interface Contract {
    findOne: (input: Input) => Promise<Output>
  }
}
