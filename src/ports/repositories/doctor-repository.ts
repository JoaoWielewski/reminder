import { Doctor } from '../../domain/entities/doctor'
import { UpdateDoctorDto } from './dtos/doctor/update-doctor'

export namespace DoctorRepositoryPort {
  export interface Contracts {
    findOne(id: string): Promise<Doctor>
    create(input: Doctor): Promise<void>
    update(input: UpdateDoctorDto): Promise<void>
    resetReminders(): Promise<void>
    findOneByEmail(email: string): Promise<Doctor>
  }
}
