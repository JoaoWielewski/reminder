export interface PeriodFormatterContract {
  format: (type: string, quantity: number) => Promise<string>
}
