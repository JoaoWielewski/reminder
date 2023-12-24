import { IsBusinessDayValidatorContract } from '../../ports/utils/is-business-day'

const DAY_OFS = [
  '01/01/2024',
  '13/02/2024',
  '29/03/2024',
  '21/04/2024',
  '01/05/2024',
  '30/05/2024',
  '07/09/2024',
  '12/10/2024',
  '02/11/2024',
  '15/11/2024',
  '19/12/2024',
  '24/12/2024',
  '25/12/2024',
  '31/12/2024'
]

export class IsBusinessDayValidatorAdapter
  implements IsBusinessDayValidatorContract
{
  async validate(date: Date): Promise<boolean> {
    const isWeekend = date.getDay() === 0 || date.getDay() === 6

    const formattedDate = date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })

    const isDayOff = DAY_OFS.includes(formattedDate)

    return !isWeekend && !isDayOff
  }
}
