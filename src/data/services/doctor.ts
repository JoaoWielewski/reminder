import { DoctorRepositoryPort } from '../../ports/repositories/doctor-repository'
import { GetDoctorCase } from '../../ports/usecases/doctor/get-doctor'

export type DoctorContracts = GetDoctorCase.Contract

export class DoctorService implements DoctorContracts {
  constructor(
    private readonly doctorRepository: DoctorRepositoryPort.Contracts
  ) {}

  async findOne({ id }: GetDoctorCase.Input): Promise<GetDoctorCase.Output> {
    return await this.doctorRepository.findOne(id)
  }
}
