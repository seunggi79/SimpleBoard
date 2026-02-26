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
