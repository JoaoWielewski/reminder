import { HttpRequest } from '../../presentation/protocols/http'

export const adaptToRequest = (event: any): HttpRequest => {
  return {
    headers: {
      ...(event.headers || {})
    },
    body: {
      ...(event.queryStringParameters || {}),
      ...(event.body ? JSON.parse(event.body) : {}),
      ...(event.pathParameters || {})
    }
  }
}
