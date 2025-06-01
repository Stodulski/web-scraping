import api from '../axiosConfig'
import { useState } from 'react'
import { toast } from 'sonner'

export const useCreateFile = (files, setFiles) => {
  const [url, setUrl] = useState('')
  const handleUrl = e => {
    setUrl(e.target.value)
  }
  const generateCSV = async e => {
    e.preventDefault()
    let toastId
    try {
      if (!url) {
        toastId = toast.error('Please enter a URL', { duration: 1000 })
        return
      }
      toastId = toast.loading('Creating CSV file...')
      const result = await api.post('/csv', { url: url })
      setFiles([result.data, ...files])
      setUrl('')
      toast.success('CSV file created successfully', {
        id: toastId,
        duration: 1000
      })
    } catch (error) {
      toast.error(error.response ? error.response.data.error : 'Server error', {
        id: toastId,
        duration: 2000
      })
      setUrl(null)
    }
  }
  return { url, handleUrl, generateCSV }
}
