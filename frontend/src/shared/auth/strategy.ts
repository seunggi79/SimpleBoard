export type AuthStrategy = 'session' | 'jwt'

const DEFAULT_AUTH_STRATEGY: AuthStrategy = 'jwt'

export function getAuthStrategy(): AuthStrategy {
  const strategy = import.meta.env.VITE_AUTH_STRATEGY?.toLowerCase()
  return strategy === 'session' ? 'session' : DEFAULT_AUTH_STRATEGY
}
