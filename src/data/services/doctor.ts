import bcrypt from 'bcryptjs'
import { Doctor } from '../../domain/entities/doctor'
import { PRONOUN } from '../../domain/entities/enums/pronoun'
import { GenerateIdPort } from '../../ports/crypto/generate-id'
import { DoctorRepositoryPort } from '../../ports/repositories/doctor-repository'
import { CreateDoctorCase } from '../../ports/usecases/doctor/create-doctor'
import { GetDoctorCase } from '../../ports/usecases/doctor/get-doctor'
import { ResetRemindersCase } from '../../ports/usecases/doctor/reset-reminders'
import { UpdateDoctorCase } from '../../ports/usecases/doctor/update-doctor'

export type DoctorContracts = GetDoctorCase.Contract &
  CreateDoctorCase.Contract &
  UpdateDoctorCase.Contract &
  ResetRemindersCase.Contract

export class DoctorService implements DoctorContracts {
  constructor(
    private readonly doctorRepository: DoctorRepositoryPort.Contracts,
    private readonly generateId: GenerateIdPort
  ) {}

  async findOne({ id }: GetDoctorCase.Input): Promise<GetDoctorCase.Output> {
    return await this.doctorRepository.findOne(id)
  }

  async create({
    name,
    phone,
    specialty,
    email,
    pronoun,
    daysToSchedule,
    schedulePhone,
    password
  }: CreateDoctorCase.Input): Promise<CreateDoctorCase.Output> {
    const doctor = new Doctor({
      id: this.generateId.generate(),
      name,
      phone,
      specialty,
      email,
      pronoun: pronoun as PRONOUN,
      daysToSchedule,
      schedulePhone,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
      isActive: false,
      monthlyReminders: 0,
      remainingReminders: 0,
      createdAt: new Date()
    })

    await this.doctorRepository.create(doctor)

    return doctor
  }

  async update({
    id,
    phone,
    specialty,
    daysToSchedule,
    email,
    schedulePhone
  }: UpdateDoctorCase.Input): Promise<void> {
    await this.doctorRepository.update({
      id,
      phone,
      specialty,
      days_to_schedule: daysToSchedule,
      email,
      schedule_phone: schedulePhone
    })
  }

  async resetReminders(): Promise<void> {
    await this.doctorRepository.resetReminders()
  }
}
