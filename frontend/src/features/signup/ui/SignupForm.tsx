import type { FormEvent } from 'react'

type SignupFormProps = {
  email: string
  nickname: string
  password: string
  passwordConfirm: string
  submitting: boolean
  onEmailChange: (value: string) => void
  onNicknameChange: (value: string) => void
  onPasswordChange: (value: string) => void
  onPasswordConfirmChange: (value: string) => void
  onSubmit: (e: FormEvent) => void
}

export function SignupForm({
  email,
  nickname,
  password,
  passwordConfirm,
  submitting,
  onEmailChange,
  onNicknameChange,
  onPasswordChange,
  onPasswordConfirmChange,
  onSubmit,
}: SignupFormProps) {
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
          닉네임
          <input
            value={nickname}
            onChange={(e) => onNicknameChange(e.target.value)}
            placeholder="닉네임"
            maxLength={30}
            autoComplete="nickname"
          />
        </label>

        <label className="field">
          비밀번호
          <input
            type="password"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            placeholder="8자 이상"
            minLength={8}
            maxLength={64}
            autoComplete="new-password"
          />
        </label>

        <label className="field">
          비밀번호 확인
          <input
            type="password"
            value={passwordConfirm}
            onChange={(e) => onPasswordConfirmChange(e.target.value)}
            placeholder="비밀번호 재입력"
            minLength={8}
            maxLength={64}
            autoComplete="new-password"
          />
        </label>

        <button type="submit" disabled={submitting}>
          {submitting ? '처리 중...' : '회원가입'}
        </button>
      </form>
    </section>
  )
}
