export namespace UpdateDoctorCase {
  export type Input = {
    id: string
    phone?: string
    specialty?: string
    daysToSchedule?: number
    email?: string
    schedulePhone?: string
  }

  export type Output = void

  export interface Contract {
    update: (input: Input) => Promise<Output>
  }
}
