import { clearAccessToken, saveAccessToken } from '../../../shared/auth/jwt'
import { getAuthStrategy } from '../../../shared/auth/strategy'
import { request } from '../../../shared/api/request'
import type { LoginPayload, LoginResult, SignupPayload, SignupResult } from '../model/types'

async function parseError(res: Response) {
  const text = await res.text()
  if (!text) return `HTTP ${res.status}`

  try {
    const json = JSON.parse(text) as { message?: string; error?: string }
    const message = json.message ?? json.error
    if (message) return `${res.status} ${message}`
  } catch {
    // Ignore JSON parsing errors and fallback to raw response text.
  }

  return `${res.status} ${text}`
}

export async function signup(payload: SignupPayload) {
  const res = await request('/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) throw new Error(await parseError(res))
  return (await res.json()) as SignupResult
}

function getJwtToken(result: Record<string, unknown>) {
  const token = result.accessToken ?? result.token ?? result.jwt
  return typeof token === 'string' && token.trim() ? token : null
}

export async function login(payload: LoginPayload) {
  const res = await request('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) throw new Error(await parseError(res))
  const result = (await res.json()) as Record<string, unknown>
  const strategy = getAuthStrategy()

  if (strategy === 'jwt') {
    const accessToken = getJwtToken(result)
    if (!accessToken) {
      clearAccessToken()
      throw new Error('JWT 로그인 응답에 토큰이 없습니다.')
    }

    saveAccessToken(accessToken)
    return { ...(result as LoginResult), accessToken }
  }

  clearAccessToken()
  return result as LoginResult
}
