export function withSessionCredentials(init: RequestInit = {}) {
  return {
    ...init,
    credentials: 'include' as const,
  }
}
