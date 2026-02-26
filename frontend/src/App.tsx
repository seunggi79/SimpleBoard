import './App.css'
import { BoardPage } from './pages/BoardPage'
import { LoginPage } from './pages/LoginPage'
import { SignupPage } from './pages/SignupPage'

function App() {
  const pathname = window.location.pathname
  const isLoginPath = pathname.startsWith('/login')
  const isSignupPath = pathname.startsWith('/signup')
  const isBoardPath = !isLoginPath && !isSignupPath

  return (
    <div className="shell">
      <nav className="top-nav">
        <a className={`nav-link ${isBoardPath ? 'active' : ''}`} href="/">
          게시판
        </a>
        <a className={`nav-link ${isLoginPath ? 'active' : ''}`} href="/login">
          로그인
        </a>
        <a className={`nav-link ${isSignupPath ? 'active' : ''}`} href="/signup">
          회원가입
        </a>
      </nav>

      {isLoginPath && <LoginPage />}
      {isSignupPath && <SignupPage />}
      {isBoardPath && <BoardPage />}
    </div>
  )
}

export default App
