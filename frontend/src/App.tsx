import './App.css'
import { BoardPage } from './pages/BoardPage'
import { SignupPage } from './pages/SignupPage'

function App() {
  const isSignupPath = window.location.pathname.startsWith('/signup')

  return (
    <div className="shell">
      <nav className="top-nav">
        <a className={`nav-link ${!isSignupPath ? 'active' : ''}`} href="/">
          게시판
        </a>
        <a className={`nav-link ${isSignupPath ? 'active' : ''}`} href="/signup">
          회원가입
        </a>
      </nav>

      {isSignupPath ? <SignupPage /> : <BoardPage />}
    </div>
  )
}

export default App
