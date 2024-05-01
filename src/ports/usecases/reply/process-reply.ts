export namespace ProcessReplyCase {
  export type Input = {
    phone: string
    name: string
    text: string
    timestamp: string
  }

  export type Output = void

  export interface Contract {
    process: (input: Input) => Promise<Output>
  }
}
