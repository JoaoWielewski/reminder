export namespace DeleteReminderCase {
  export type Input = {
    id: string
  }

  export type Output = void

  export interface Contract {
    delete: (input: Input) => Promise<Output>
  }
}
