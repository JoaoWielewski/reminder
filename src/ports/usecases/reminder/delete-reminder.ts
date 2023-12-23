export namespace DeleteReminderCase {
  export type Input = {
    id: string
    doctorId: string
  }

  export type Output = void

  export interface Contract {
    delete: (input: Input) => Promise<Output>
  }
}
