import api from '../axiosConfig'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/auth.context'
import { useContext } from 'react'
import { toast } from 'sonner'

export const useLogout = () => {
  const navigate = useNavigate()
  const { setLoggedIn } = useContext(AuthContext)

  const logout = async () => {
    await api.delete('/session')
    setLoggedIn(null)
    toast.success('Logged out successfully')
    navigate('/login')
  }
  return { logout }
}
