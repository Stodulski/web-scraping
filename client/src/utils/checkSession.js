import api from '../axiosConfig'

export const checkSession = async () => {
  const res = await api.get('/session')
  if (!res.data.loggedIn) {
    return false
  }
  return true
}
