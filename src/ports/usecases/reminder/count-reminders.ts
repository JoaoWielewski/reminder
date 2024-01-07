export namespace CountRemindersCase {
  export type Input = {
    doctorId: string
  }

  export type Output = number

  export interface Contract {
    count: (input: Input) => Promise<Output>
  }
}
