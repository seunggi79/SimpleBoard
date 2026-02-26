import { SignupForm } from '../features/signup/ui/SignupForm'
import { useSignupForm } from '../features/signup/model/useSignupForm'

export function SignupPage() {
  const {
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
  } = useSignupForm()

  return (
    <main className="signup">
      <header className="signup-header">
        <h1>회원가입</h1>
        <p>이메일, 닉네임, 비밀번호를 입력해 계정을 생성하세요.</p>
      </header>

      <SignupForm
        email={email}
        nickname={nickname}
        password={password}
        passwordConfirm={passwordConfirm}
        submitting={submitting}
        onEmailChange={setEmail}
        onNicknameChange={setNickname}
        onPasswordChange={setPassword}
        onPasswordConfirmChange={setPasswordConfirm}
        onSubmit={onSubmit}
      />

      {error && <p className="error">오류: {error}</p>}
      {success && <p className="success">{success}</p>}
    </main>
  )
}
