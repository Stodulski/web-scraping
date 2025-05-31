import api from '../axiosConfig'
import { toast } from 'sonner'

export const useDownloadFile = (id, filename) => {
  const downloadFile = async () => {
    let toastId
    try {
      toastId = toast.info('Downloading file...')
      const result = await api.get(`/csv/${id}`, {
        responseType: 'blob'
      })
      const blob = new Blob([result.data], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      link.remove()
      toast.success('File downloaded successfully', { id: toastId, duration: 1000 })
    } catch (error) {
      toast.error('Error downloading file', { id: toastId, duration: 1000 })
    }
  }

  return { downloadFile }
}
