import api from '../axiosConfig'

export const checkSession = async () => {
  try {
    await api.get('/session')
    return true
  } catch (err) {
    return false
  }
}
