import { HttpResponse } from '../protocols/http'

export const ok = (body?: any): HttpResponse => {
  return {
    statusCode: 200,
    body: JSON.stringify(body)
  }
}

export const created = (body?: any): HttpResponse => {
  return {
    statusCode: 201,
    body: JSON.stringify(body)
  }
}

export const badRequest = (body: any): HttpResponse => {
  return {
    statusCode: 400,
    body: JSON.stringify({
      code: body.name,
      error: body.message
    })
  }
}

export const notFound = (body: any): HttpResponse => {
  return {
    statusCode: 404,
    body: JSON.stringify({
      code: body.name,
      error: body.message
    })
  }
}

export const unauthorized = (body: any): HttpResponse => {
  return {
    statusCode: 401,
    body: JSON.stringify({
      code: body.name,
      error: body.message
    })
  }
}

export const serverError = (body: any): HttpResponse => {
  return {
    statusCode: 500,
    body: JSON.stringify({
      code: body.name,
      error: body.message
    })
  }
}

export const conflict = (body: any): HttpResponse => {
  return {
    statusCode: 409,
    body: JSON.stringify({
      code: body.name,
      error: body.message
    })
  }
}

export const noContent = (): HttpResponse => {
  return {
    statusCode: 204
  }
}
