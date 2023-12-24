import { Doctor } from '../../../domain/entities/doctor'

export namespace GetDoctorCase {
  export type Input = {
    id: string
  }

  export type Output = voi

  export interface Contract {
    findOne: (input: Input) => Promise<Output>
  }
}
