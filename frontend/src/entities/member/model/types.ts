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

export type LoginResult = {
  memberId: number
  nickname: string
  role: string
}
