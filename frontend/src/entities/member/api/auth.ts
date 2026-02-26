import type { SignupPayload, SignupResult } from '../model/types'

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
  const res = await fetch('/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) throw new Error(await parseError(res))
  return (await res.json()) as SignupResult
}
