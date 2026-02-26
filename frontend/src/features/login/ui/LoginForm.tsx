import type { FormEvent } from 'react'

type LoginFormProps = {
  email: string
  password: string
  submitting: boolean
  onEmailChange: (value: string) => void
  onPasswordChange: (value: string) => void
  onSubmit: (e: FormEvent) => void
}

export function LoginForm({
  email,
  password,
  submitting,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: LoginFormProps) {
  return (
    <section className="panel">
      <form className="form" onSubmit={onSubmit}>
        <label className="field">
          이메일
          <input
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
          />
        </label>

        <label className="field">
          비밀번호
          <input
            type="password"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            placeholder="비밀번호"
            autoComplete="current-password"
          />
        </label>

        <button type="submit" disabled={submitting}>
          {submitting ? '처리 중...' : '로그인'}
        </button>
      </form>
    </section>
  )
}
