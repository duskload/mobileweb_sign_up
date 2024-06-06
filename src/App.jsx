import './App.scss'
import { Header } from './components/Header.jsx'
import { SignUpForm } from './components/SignUpForm.jsx'

function App() {
  return (
    <div className="app-wrapper">
      <Header title="Sign up" />

      <SignUpForm />
    </div>
  )
}

export default App
