import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import { useContext } from 'react'
import { Toaster } from 'sonner'

import { Home } from './pages/home'
import { Login } from './pages/login'
import { AuthContext } from './context/auth.context'

import './index.css'

function App () {
  const { loggedIn } = useContext(AuthContext)

  return (
    <Router>
      <Toaster richColors position='top-center' />
      <Routes>
        {loggedIn ? (
          <>
            <Route path='/' element={<Home />} />
            <Route path='*' element={<Navigate to='/' replace />} />
          </>
        ) : (
          <>
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<Navigate to='/login' replace />} />
          </>
        )}
      </Routes>
    </Router>
  )
}

export default App
