export namespace GetDoctorByEmailCase {
  export type Input = {
    email: string
  }

  export type Output = boolean

  export interface Contract {
    findOneByEmail: (input: Input) => Promise<Output>
  }
}
