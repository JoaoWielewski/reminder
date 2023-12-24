import { PeriodFormatterContract } from '../../ports/utils/period-formatter'

export class PeriodFormatterAdapter implements PeriodFormatterContract {
  async format(type: string, quantity: number): Promise<string> {
    const unitsTranslations = {
      day: {
        singular: 'dia',
        plural: 'dias'
      },
      month: {
        singular: 'mês',
        plural: 'meses'
      },
      year: {
        singular: 'ano',
        plural: 'anos'
      }
    }

    if (quantity === 1) {
      return `1 ${unitsTranslations[type].singular}`
    } else {
      return `${quantity} ${unitsTranslations[type].plural}`
    }
  }
}
