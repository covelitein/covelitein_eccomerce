import { z } from 'zod'
import { CustomError } from 'ts-custom-error'
import { serializeError } from 'serialize-error'

class ApiError extends CustomError {
  public constructor(public code: number, message: string) {
    super(message)
  }
}

const parseValidationError = (issues: any) => {
  const errors: any = {}
  issues.forEach((issue: any) => {
    errors[issue.path[0]] = issue.message
  })
  return errors
}

export default () => {
  const BadRequest = (message?: string) => new ApiError(400, message || 'BadRequest')
  const NotAuthenticated = (message?: string) => new ApiError(401, message || 'NotAuthenticated')
  const PaymentError = (message?: string) => new ApiError(402, message || 'PaymentError')
  const Forbidden = (message?: string) => new ApiError(403, message || 'Forbidden')
  const NotFound = (message?: string) => new ApiError(404, message || 'NotFound')
  const MethodNotAllowed = (message?: string) => new ApiError(405, message || 'MethodNotAllowed')
  const NotAcceptable = (message?: string) => new ApiError(406, message || 'NotAcceptable')
  const Timeout = (message?: string) => new ApiError(408, message || 'Timeout')
  const Conflict = (message?: string) => new ApiError(409, message || 'Conflict')
  const LengthRequired = (message?: string) => new ApiError(411, message || 'LengthRequired')
  const TooManyRequests = (message?: string) => new ApiError(429, message || 'TooManyRequests')
  const InternalError = (message?: string) => new ApiError(500, message || 'InternalError')
  const NotImplemented = (message?: string) => new ApiError(501, message || 'NotImplemented')
  const BadGateway = (message?: string) => new ApiError(502, message || 'BadGateway')
  const Unavailable = (message?: string) => new ApiError(503, message || 'Unavailable')

  const ValidationError = (error: any) => {
    let message = 'Could not validate data'
    let data: any
    if (error instanceof z.ZodError) {
      message = error.issues?.[0]?.message ?? 'Could not validate data'
      data = parseValidationError(error.issues)
    } else if (error.message) {
      message = error.message
    } else if (typeof error == 'string') {
      message = error
    }
    const errorResponse = serializeError(new ApiError(400, message))
    return { errors: data, ...errorResponse }
  }

  return {
    BadRequest,
    NotAuthenticated,
    PaymentError,
    Forbidden,
    NotFound,
    MethodNotAllowed,
    NotAcceptable,
    Timeout,
    Conflict,
    LengthRequired,
    TooManyRequests,
    InternalError,
    NotImplemented,
    BadGateway,
    Unavailable,
    ValidationError,
  }
}
