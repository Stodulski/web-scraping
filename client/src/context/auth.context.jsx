import { createContext, useEffect, useState } from 'react'
import { useRef } from 'react'
import { checkSession } from '../utils/checkSession'

export const AuthContext = createContext({
  loggedIn: null,
  setLoggedIn: () => {}
})

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(null)
  const authRef = useRef(false)

  useEffect(() => {
    if (authRef.current) return
    authRef.current = true
    const checkLoggedIn = async () => {
      const isLoggedIn = await checkSession()
      setLoggedIn(isLoggedIn)
    }
    checkLoggedIn()
  }, [])
  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  )
}
