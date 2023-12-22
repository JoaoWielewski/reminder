import { Doctor } from '../../domain/entities/doctor'

export namespace DoctorRepositoryPort {
  export interface Contracts {
    findOne(id: string): Promise<Doctor>
  }
}
