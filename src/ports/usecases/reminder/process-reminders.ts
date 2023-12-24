export namespace ProcessRemindersCase {
  export type Output = void

  export interface Contract {
    process: () => Promise<Output>
  }
}
