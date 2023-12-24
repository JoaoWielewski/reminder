export interface IsBusinessDayValidatorContract {
  validate: (date: Date) => Promise<boolean>
}
