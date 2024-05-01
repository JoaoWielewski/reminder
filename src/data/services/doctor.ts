import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Environment } from '../../app/env'
import { Doctor } from '../../domain/entities/doctor'
import { PRONOUN } from '../../domain/entities/enums/pronoun'
import { GenerateIdPort } from '../../ports/crypto/generate-id'
import { DoctorRepositoryPort } from '../../ports/repositories/doctor-repository'
import { CreateDoctorCase } from '../../ports/usecases/doctor/create-doctor'
import { GetDoctorCase } from '../../ports/usecases/doctor/get-doctor'
import { GetDoctorByEmailCase } from '../../ports/usecases/doctor/get-doctor-by-email'
import { LoginCase } from '../../ports/usecases/doctor/login'
import { ResetRemindersCase } from '../../ports/usecases/doctor/reset-reminders'
import { UpdateDoctorCase } from '../../ports/usecases/doctor/update-doctor'
import { NotFoundError } from '../errors/not-found'
import { WrongPasswordError } from '../errors/wrong-password'

export type DoctorContracts = GetDoctorCase.Contract &
  CreateDoctorCase.Contract &
  UpdateDoctorCase.Contract &
  ResetRemindersCase.Contract &
  LoginCase.Contract &
  GetDoctorByEmailCase.Contract

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

  async login({ email, password }: LoginCase.Input): Promise<LoginCase.Output> {
    const doctor = await this.doctorRepository.findOneByEmail(email)

    if (!doctor) {
      throw new NotFoundError('doctor')
    }

    if (!(await bcrypt.compare(password, doctor.password))) {
      throw new WrongPasswordError()
    }

    const doctorJwt: string = jwt.sign(
      {
        id: doctor.id
      },
      Environment.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '30d'
      }
    )

    return {
      ...doctor,
      jwt: doctorJwt
    }
  }

  async findOneByEmail({
    email
  }: GetDoctorByEmailCase.Input): Promise<boolean> {
    const doctor = await this.doctorRepository.findOneByEmail(email)

    if (!doctor) {
      return false
    }
    return true
  }
}
