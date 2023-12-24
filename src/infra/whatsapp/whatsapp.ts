import axios, { AxiosInstance } from 'axios'
import { Environment } from '../../app/env'

export class WhatsappProvider {
  static instance: AxiosInstance

  static getInstance() {
    if (!this.instance) {
      this.instance = axios.create({
        baseURL: Environment.WHATSAPP_ENDPOINT,
        headers: {
          Authorization: `Bearer ${Environment.WHATSAPP_TOKEN}`
        }
      })
    }
    return this.instance
  }
}
