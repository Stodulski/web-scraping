import { toast } from 'sonner'
import api from '../axiosConfig'

export const useDeleteFile = (id, files, setFiles) => {
  const deleteFile = async () => {
    try {
      const newFiles = files.filter(file => file._id !== id)
      setFiles(newFiles)
      await api.delete(`/csv/${id}`)

      toast.success('File deleted successfully', {
        duration: 2000
      })
    } catch (error) {
      toast.error('Error deleting file', { duration: 2000 })
    }
  }

  return { deleteFile }
}
