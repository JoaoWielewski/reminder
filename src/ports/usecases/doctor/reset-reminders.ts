export namespace ResetRemindersCase {
  export type Output = void

  export interface Contract {
    resetReminders: () => Promise<Output>
  }
}
