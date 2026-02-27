export type SignupPayload = {
  email: string
  nickname: string
  password: string
}

export type SignupResult = {
  id: number
  email: string
  nickname: string
}

export type LoginPayload = {
  email: string
  password: string
}

export type SessionLoginResult = {
  memberId: number
  nickname: string
  role: string
}

export type JwtLoginResult = {
  memberId: number
  accessToken: string
  nickname?: string
  role?: string
}

export type LoginResult = SessionLoginResult | JwtLoginResult
