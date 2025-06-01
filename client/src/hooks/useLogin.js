import { toast } from 'sonner'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../context/auth.context'

import api from '../axiosConfig'

export const useLogin = () => {
  const { setLoggedIn } = useContext(AuthContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleUsernameChange = e => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }

  const login = async e => {
    e.preventDefault()
    if (!username || !password) {
      return toast.error('Please fill in all fields')
    }
    let toastId
    try {
      toastId = toast.loading('Logging in...')
      const response = await api.post(`/session`, {
        username,
        password
      })
      setLoggedIn(true)
      navigate('/')
      toast.success('Login successful.', { id: toastId, duration: 2000 })
    } catch (err) {
      setLoggedIn(false)
      toast.error(err.response ? err.response?.data?.error : 'Server error.', {
        id: toastId,
        duration: 2000
      })
    }
  }

  return {
    login,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
  }
}
