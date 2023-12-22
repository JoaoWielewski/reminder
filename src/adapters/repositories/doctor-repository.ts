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
}
