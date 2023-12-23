import { REMINDER_STATUS } from '../../domain/entities/enums/status'
import { Reminder } from '../../domain/entities/reminder'
import { GenerateIdPort } from '../../ports/crypto/generate-id'
import { DoctorRepositoryPort } from '../../ports/repositories/doctor-repository'
import { ReminderRepositoryPort } from '../../ports/repositories/reminder-repository'
import { CreateReminderCase } from '../../ports/usecases/reminder/create-reminder'
import { DeleteReminderCase } from '../../ports/usecases/reminder/delete-reminder'
import { GetRemindersCase } from '../../ports/usecases/reminder/get-reminders'
import { OutOfRemindersError } from '../errors/out-of-reminders'

export type ReminderContracts = CreateReminderCase.Contract &
  GetRemindersCase.Contract &
  DeleteReminderCase.Contract

export class ReminderService implements ReminderContracts {
  constructor(
    private readonly reminderRepository: ReminderRepositoryPort.Contracts,
    private readonly doctorRepository: DoctorRepositoryPort.Contracts,
    private readonly generateId: GenerateIdPort
  ) {}

  async create({
    doctorId,
    pacientName,
    pacientPhone,
    periodType,
    periodQuantity
  }: CreateReminderCase.Input): Promise<CreateReminderCase.Output> {
    const doctor = await this.doctorRepository.findOne(doctorId)
    const currentRemainingReminders = doctor.remainingReminders

    if (currentRemainingReminders < 1) {
      throw new OutOfRemindersError(doctorId)
    }

    const deletedActiveReminders =
      await this.reminderRepository.deleteActiveReminders({
        doctorId,
        pacientPhone
      })

    const expectedReturnDate = new Date()

    switch (periodType) {
      case 'day':
        expectedReturnDate.setDate(
          expectedReturnDate.getDate() + periodQuantity
        )
        break
      case 'month':
        expectedReturnDate.setMonth(
          expectedReturnDate.getMonth() + periodQuantity
        )
        break
      case 'year':
        expectedReturnDate.setFullYear(
          expectedReturnDate.getFullYear() + periodQuantity
        )
        break
    }

    const reminder = new Reminder({
      id: this.generateId.generate(),
      doctorId,
      pacientName,
      pacientPhone,
      periodType,
      periodQuantity,
      expectedReturnDate,
      status: REMINDER_STATUS.WAITING,
      createdAt: new Date()
    })

    await this.reminderRepository.create(reminder)

    let newRemainingReminders = currentRemainingReminders - 1
    if (deletedActiveReminders > 0) {
      newRemainingReminders += 1
    }

    await this.doctorRepository.update({
      id: doctorId,
      remaining_reminders: newRemainingReminders
    })

    return reminder
  }

  async findMany({
    doctorId
  }: GetRemindersCase.Input): Promise<GetRemindersCase.Output> {
    return await this.reminderRepository.find(doctorId)
  }

  async delete({ id, doctorId }: DeleteReminderCase.Input): Promise<void> {
    const doctor = await this.doctorRepository.findOne(doctorId)
    const currentRemainingReminders = doctor.remainingReminders

    await this.doctorRepository.update({
      id: doctorId,
      remaining_reminders: currentRemainingReminders + 1
    })

    await this.reminderRepository.delete(id)
  }
}
