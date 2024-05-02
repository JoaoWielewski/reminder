import { REMINDER_STATUS } from '../../domain/entities/enums/status'
import { Reminder } from '../../domain/entities/reminder'
import { GenerateIdPort } from '../../ports/crypto/generate-id'
import { SQSProviderPort } from '../../ports/providers/sqs'
import { DoctorRepositoryPort } from '../../ports/repositories/doctor-repository'
import { ReminderRepositoryPort } from '../../ports/repositories/reminder-repository'
import { CountRemindersCase } from '../../ports/usecases/reminder/count-reminders'
import { CreateReminderCase } from '../../ports/usecases/reminder/create-reminder'
import { DeleteReminderCase } from '../../ports/usecases/reminder/delete-reminder'
import { GetRemindersCase } from '../../ports/usecases/reminder/get-reminders'
import { ProcessRemindersCase } from '../../ports/usecases/reminder/process-reminders'
import { SearchRemindersCase } from '../../ports/usecases/reminder/search-reminders'
import { IsBusinessDayValidatorContract } from '../../ports/utils/is-business-day'
import { PeriodFormatterContract } from '../../ports/utils/period-formatter'
import { NoneRemindersError } from '../errors/none-reminders'
import { NotBusinessDayError } from '../errors/not-business-day'
import { NotFoundError } from '../errors/not-found'
import { OutOfRemindersError } from '../errors/out-of-reminders'

export type ReminderContracts = CreateReminderCase.Contract &
  GetRemindersCase.Contract &
  DeleteReminderCase.Contract &
  ProcessRemindersCase.Contract &
  SearchRemindersCase.Contract &
  CountRemindersCase.Contract

export class ReminderService implements ReminderContracts {
  constructor(
    private readonly reminderRepository: ReminderRepositoryPort.Contracts,
    private readonly doctorRepository: DoctorRepositoryPort.Contracts,
    private readonly generateId: GenerateIdPort,
    private readonly sqsProvider: SQSProviderPort,
    private readonly periodFormatter: PeriodFormatterContract,
    private readonly isBusinessDayValidator: IsBusinessDayValidatorContract
  ) {}

  async create({
    doctorId,
    pacientName,
    pacientPhone,
    periodType,
    periodQuantity
  }: CreateReminderCase.Input): Promise<CreateReminderCase.Output> {
    const doctor = await this.doctorRepository.findOne(doctorId)

    if (!doctor) {
      throw new NotFoundError('doctor')
    }

    const currentRemainingReminders = doctor.remainingReminders
    const monthlyReminders = doctor.monthlyReminders

    if (currentRemainingReminders < 1 && monthlyReminders === 0) {
      throw new NoneRemindersError(doctorId)
    }

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
      status: REMINDER_STATUS.ACTIVE,
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
    doctorId,
    page,
    limit
  }: GetRemindersCase.Input): Promise<GetRemindersCase.Output> {
    return await this.reminderRepository.find({ doctorId, page, limit })
  }

  async search({
    doctorId,
    page,
    limit,
    query
  }: SearchRemindersCase.Input): Promise<SearchRemindersCase.Output> {
    return await this.reminderRepository.search({
      doctorId,
      page,
      limit,
      query
    })
  }

  async delete({ id, doctorId }: DeleteReminderCase.Input): Promise<void> {
    const doctor = await this.doctorRepository.findOne(doctorId)

    if (!doctor) {
      throw new NotFoundError('doctor')
    }

    const currentRemainingReminders = doctor.remainingReminders

    await this.doctorRepository.update({
      id: doctorId,
      remaining_reminders: currentRemainingReminders + 1
    })

    await this.reminderRepository.delete(id)
  }

  async process(): Promise<void> {
    const currentDate = new Date()
    const isBusinessDay =
      await this.isBusinessDayValidator.validate(currentDate)

    if (!isBusinessDay) {
      throw new NotBusinessDayError()
    }

    const activeReminders = await this.reminderRepository.findActiveReminders()

    for (const reminder of activeReminders) {
      const doctor = await this.doctorRepository.findOne(reminder.doctorId)

      if (!doctor) {
        throw new NotFoundError('doctor')
      }

      const expectedReturnDateString = reminder.expectedReturnDate
      const expectedReturnDate = new Date(expectedReturnDateString)
      if (doctor.daysToSchedule) {
        expectedReturnDate.setDate(
          expectedReturnDate.getDate() - doctor.daysToSchedule
        )
      } else {
        expectedReturnDate.setDate(expectedReturnDate.getDate() - 1)
      }

      if (currentDate > expectedReturnDate) {
        const expectedReturnDate = new Date(expectedReturnDateString)

        while (
          !(await this.isBusinessDayValidator.validate(expectedReturnDate))
        ) {
          expectedReturnDate.setDate(expectedReturnDate.getDate() + 1)
        }

        const formattedReturnDate = expectedReturnDate.toLocaleDateString(
          'pt-BR',
          {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          }
        )

        await this.sqsProvider.sendMessageToQueue(
          JSON.stringify({
            reminderId: reminder.id,
            pacientName: reminder.pacientName,
            doctorName: doctor.name,
            daysToSchedule: doctor.daysToSchedule,
            specialty: doctor.specialty,
            date: formattedReturnDate,
            period: await this.periodFormatter.format(
              reminder.periodType,
              reminder.periodQuantity
            ),
            pacientPhone: reminder.pacientPhone,
            schedulePhone: doctor.schedulePhone,
            pronoun: doctor.pronoun
          }),
          'messageQueue'
        )
      }
    }
  }

  async count({
    doctorId
  }: CountRemindersCase.Input): Promise<CountRemindersCase.Output> {
    return await this.reminderRepository.count(doctorId)
  }
}
