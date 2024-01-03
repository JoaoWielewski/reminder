export namespace CreateRedirectCase {
  export type Input = {
    reminderId: string
  }

  export type Output = void

  export interface Contract {
    create: (input: Input) => Promise<Output>
  }
}
