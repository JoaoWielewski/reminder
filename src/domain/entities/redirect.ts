export type RedirectDomain = {
  id: string
  reminderId: string
  createdAt: Date
}

export class Redirect implements RedirectDomain {
  id: string
  reminderId: string
  createdAt: Date

  constructor(props: RedirectDomain) {
    Object.assign(this, props)
  }
}
