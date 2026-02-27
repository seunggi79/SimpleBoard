import { getAccessToken } from '../auth/jwt'
import { withSessionCredentials } from '../auth/session'
import { getAuthStrategy } from '../auth/strategy'

type RequestOptions = {
  requiresAuth?: boolean
}

export function request(input: RequestInfo | URL, init: RequestInit = {}, options: RequestOptions = {}) {
  const strategy = getAuthStrategy()
  let nextInit = { ...init }

  if (strategy === 'session') {
    nextInit = withSessionCredentials(nextInit)
  }

  if (strategy === 'jwt' && options.requiresAuth) {
    const token = getAccessToken()
    if (token) {
      const headers = new Headers(nextInit.headers)
      headers.set('Authorization', `Bearer ${token}`)
      nextInit.headers = headers
    }
  }

  return fetch(input, nextInit)
}
