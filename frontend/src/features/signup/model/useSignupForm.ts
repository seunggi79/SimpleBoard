import { useState } from 'react'
import type { FormEvent } from 'react'
import { signup } from '../../../entities/member/api/auth'

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback
}

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function useSignupForm() {
  const [email, setEmail] = useState('')
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    const trimmedEmail = email.trim()
    const trimmedNickname = nickname.trim()

    if (!trimmedEmail || !trimmedNickname || !password || !passwordConfirm) {
      setError('모든 항목을 입력해 주세요.')
      return
    }

    if (!validateEmail(trimmedEmail)) {
      setError('이메일 형식이 올바르지 않습니다.')
      return
    }

    if (trimmedNickname.length > 30) {
      setError('닉네임은 30자 이하여야 합니다.')
      return
    }

    if (password.length < 8 || password.length > 64) {
      setError('비밀번호는 8자 이상 64자 이하여야 합니다.')
      return
    }

    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.')
      return
    }

    try {
      setSubmitting(true)
      const result = await signup({
        email: trimmedEmail,
        nickname: trimmedNickname,
        password,
      })

      setSuccess(`${result.nickname}님 회원가입이 완료되었습니다.`)
      setEmail('')
      setNickname('')
      setPassword('')
      setPasswordConfirm('')
    } catch (e) {
      setError(getErrorMessage(e, '회원가입에 실패했습니다.'))
    } finally {
      setSubmitting(false)
    }
  }

  return {
    email,
    nickname,
    password,
    passwordConfirm,
    submitting,
    error,
    success,
    setEmail,
    setNickname,
    setPassword,
    setPasswordConfirm,
    onSubmit,
  }
}
