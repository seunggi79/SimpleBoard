import { useState } from 'react'
import type { FormEvent } from 'react'
import { login } from '../../../entities/member/api/auth'

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback
}

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function useLoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    const trimmedEmail = email.trim()

    if (!trimmedEmail || !password) {
      setError('이메일과 비밀번호를 입력해 주세요.')
      return
    }

    if (!validateEmail(trimmedEmail)) {
      setError('이메일 형식이 올바르지 않습니다.')
      return
    }

    try {
      setSubmitting(true)
      const result = await login({
        email: trimmedEmail,
        password,
      })

      setSuccess(`${result.nickname}님 로그인되었습니다. (${result.role})`)
      setPassword('')
    } catch (e) {
      setError(getErrorMessage(e, '로그인에 실패했습니다.'))
    } finally {
      setSubmitting(false)
    }
  }

  return {
    email,
    password,
    submitting,
    error,
    success,
    setEmail,
    setPassword,
    onSubmit,
  }
}
