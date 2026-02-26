import { useLoginForm } from '../features/login/model/useLoginForm'
import { LoginForm } from '../features/login/ui/LoginForm'

export function LoginPage() {
  const { email, password, submitting, error, success, setEmail, setPassword, onSubmit } =
    useLoginForm()

  return (
    <main className="login">
      <header className="login-header">
        <h1>로그인</h1>
        <p>가입한 이메일과 비밀번호로 로그인하세요.</p>
      </header>

      <LoginForm
        email={email}
        password={password}
        submitting={submitting}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onSubmit={onSubmit}
      />

      {error && <p className="error">오류: {error}</p>}
      {success && <p className="success">{success}</p>}
    </main>
  )
}
